var express = require('express');
const app = require('../app');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// //params와 query객체로 값들이 들어옴
// //다양한 아우터중 와일드카드 역할 이므로 일반 라우터들보다 뒤에 배치해야하 방해하지않음
// router.get('/:id', function(req, res) {
//   console.log(req.params, req.query);
//   res.send('respond with a resource');
// });



router.get('/flash', function(req, res){
  req.session.message = '세션 메시지';
  req.flash('message', 'flash 메시지');
  res.redirect('/users/flash/result');
});

router.get('/flash/result', function(req,res){
  res.send(`${req.session.message} ${req.flash('message')}`);
});

module.exports = router;


