// var express = require('express');
// var User = require('../models').User;

// var router = express.Router();

// /* GET home page. */

// //async/await 문법 사용
// router.get('/', async(req, res, next) => {

//   try {
//     const users = await User.findALL();
//     res.render('sequelize', {users});
//   } catch (error) {
//     console.error(err);
//     next(err);
//   }

// });


// // router.get('/', function(req, res, next) {
// //   User.findAll()
// //   .then((users) => {
// //     res.render('sequelize', {users});
// //   })
// //   .catch((err) => {
// //     console.error(err);
// //     next(err);
// //   });
// // });



// module.exports = router;

const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.render('sequelize', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;