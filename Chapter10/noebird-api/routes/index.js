// const express = require('express');
// // const uuidv4 = require('uuid/v4');
// const { v4: uuidv4 } = require('uuid');
// const {User, Domain} = require('../models');

// const router = express.Router();

// router.get('/', (req, res, next) => {

 
//     User.findOne({
//         where: {id: req.user && req.user.id || null },
//         include: { model: Domain},
//     })
//     .then((user) => {
//         console.log(user);
//         res.render('login', {
//             user,
//             loginError: req.flash('loginError'),
//             domains: user &&  user.domains,
//          });
//     })
//     .catch((error) => {
//         next(error);
//     });
// });

// router.post('/domain', (req, res, next) => {
//     Domain.create({
//         uesrId: req.user.id,
//         host: req.body.host,
//         type: req.body.type,
//         clientSecret: uuidv4(),
//     })
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch((error) => {
//         next(error);
//     });
// });

// module.exports = router;

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { User, Domain } = require('../models');

const router = express.Router();

router.get('/', (req, res, next) => {
 if(req.user)
 {
  User.findOne({
    where: { id: req.user && req.user.id },
    include: { model: Domain },
  })
    .then((user) => {
      res.render('login', {
        user,
        loginError: req.flash('loginError'),
        domains: user && user.domains,
      });
    })
    .catch((error) => {
      next(error);
    });
}else{
    res.render('login');
}
 
});

router.post('/domain', (req, res, next) => {
  Domain.create({
    userId: req.user.id,
    host: req.body.host,
    type: req.body.type,
    clientSecret: uuidv4(),
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;