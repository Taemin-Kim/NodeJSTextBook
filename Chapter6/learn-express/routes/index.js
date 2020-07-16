var express = require('express');
const { route } = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});



//params와 query객체로 값들이 들어옴
//다양한 아우터중 와일드카드 역할 이므로 일반 라우터들보다 뒤에 배치해야하 방해하지않음
router.get('/users/:id', function(req, res) {
  console.log(req.params, req.query);

  res.status(404).send(`${req.params.id} , ${req.query}`);
});



// router.get('/', function(req, res ,next){
//   next('route');
// }, function(req,res,next) {
//    console.log('실행되지 않습니다.');
//    next();
// },function(req,res,next) {
//   console.log('실행되지 않습니다.');
//   next();
// });

// router.get('/', function(req,res) {
//   console.log('실행 됩니다.');
//   res.render('index', { title: 'Express' });
// })



module.exports = router;
