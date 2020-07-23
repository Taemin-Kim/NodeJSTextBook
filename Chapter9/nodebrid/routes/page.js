const express = require('express');
const {isLoggedIn, isNotLoggedIn } = require('./middlewares');   //미들웨어를 만듬으로써 이 과정을 지나야만 로그인이 되었는지 안되었는지 확인할수 있다.
//내부적으로 next()를 호출해야 다음으로 넘어가기 때문
const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird', user: req.user });
}); 

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeBird',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/', (req, res, next) => {
  res.render('main', {
    title: 'NodeBird',
    twits: [],
    user: req.user,
    loginError: req.flash('loginError'),
  });
});

module.exports = router;
