const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Good, Auction, User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

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
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;