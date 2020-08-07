const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const schedule = require('node-schedule');

const { Good, Auction, User, sequelize } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const good = require('../models/good');



const router = express.Router();


//미들웨어 첨가 pug 템플릿에 사용자 정보 변수를 집어넣음 -> req.user를 req.locals.user에 할당함
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


//메인화면 렌딩, 렌더링할 대 경매가 진행중인 상품 목록도 같이 불러옴
router.get('/', async(req, res, next) => {
    try {
        const goods = await Good.findAll({ where: { soldId: null}});
        res.render('main', {
            title: 'NodeAuction',
            goods,
            loginError: req.flash('loginError'),
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//회원가입화면
router.get('/join', isNotLoggedIn, (req,res) => { 
    res.render('join', {
        title: '회원가입 - NodeAuction',
        joinError: req.flash('joinError'),
    });
});

//상품 등록화면 렌더링
router.get('/good', isLoggedIn, (req,res) => {
    res.render('good', { title: '상품 목록 - NodeAuction'});
});

fs.readdir('uploads', (error) => {
    if(error){
        console.error('uploads 폴더가 없어 uploads 폴더 생성');
        fs.mkdirSync('uploads');
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { filesize: 5 * 1024 * 1024 },
});

// 업로드한 상품을 처리하는 라우터
router.post('/good', isLoggedIn, upload.single('img'), async(req, res, next) => {
    try {
        const {name, price} = req.body;
        await Good.create({
            ownerId: req.user.id,
            name,
            img: req.file.filename,
            price,
        });
        const end = new Date();
        end.setDate(end.getDate() + 1) // 하루 뒤
        schedule.scheduleJob(end, async() => {
            const success = await Auction.findOne({
                where: {goodId: good.id},
                order: [['bid', 'DESC']],
            });
            await Good.update({ soldId: success.userId}, { where: {id: good.id}});
            await User.update({
                money: sequelize.literal(`money - ${success.bid}`),
            }, {
                where: { id: success.userId },
            });
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//id에 해당하는 상품과 기존 입찰정보를 렌더링한다.
//Good 모델과 User 모델은 현재 일대다 관계로 두번 연결(owner, sold) 되어 있으므로 어떤 관계를 include할지 as 속승으로 밝혀 주어야한다.
router.get('/good/:id', isLoggedIn, async(req, res, next) => {
    try {
        const [good, auction] = req.params;
        Good.findOne({ 
            where: { id: req.params.id },
            include: {
                model: Uesr,
                as: 'owner',
            },
        }),
        Auction.findAll({
            where: { goodId: req.params.id },
            include : {model: User},
            order: [['bid', 'ASC']],
        });

        res.render('auction', {
            title: `${good.name} = NodeAuction`,
            good,
            auction,
            auctionError: req.flash('auctionError'),
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});


//클라이언트로부터 받은 입찰 정보를 저장한다
/*
    1. 시작가격보다 낮거나
    2. 경매 종료기간이 지났거나
    3. 현재 입찰가보다 낮은 입찰가인경우 반려
*/

router.post('/good/:id/bid', isLoggedIn , async(req, res, next) => {
    try {
        const {big, msg} = req.body;
        const good = await good.findOne({ 
            where: {id: req.params.id},
            include: {model: Auction},
            order: [[{model: Auction}, 'bid', 'DESC']],     //include될 모델의 컬럼을 정렬하는 방법임 bid를 내림차순으로 정렬(높은 번호부터 나오게 됨)
        });
        if (good.price > bid) { //시작 가격보다 낮게 입찰하면 
            return res.status(403).send('시작 가격보다 높게 입찰해야 합니다.');
        }   

        //경매 종료 기간이 지났으면 
        if(new Date(good.createdAt).valueOf() + (24 * 60 * 60 * 1000) < new Date()){
            return res.status(403).send('경매가 이미 종료되었습니다.')
        }

        //직전 입찰가와 현재 입찰가 비교
        if(good.auction[0] & good.auction[0].bid >= bid){
            return res.status(403).send('이전 입찰가보다 높아야 합니다.');
        }
        const result = await Auction.create({
            bid,
            msg,
            userId: req.user.id,
            goodId: req.params.id,
        });

        //모든 사람에게 입찰자 입찰가격 입찰 메시지등을 웹소켓으로 전달
        req.app.get('io').to(req.params.id).emit('bid', {
            bid: result.bid,
            msg: result.msg,
            nick: req.user.nick,
        });

        return res.send('ok');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;