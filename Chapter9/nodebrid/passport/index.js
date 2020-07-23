// const localStrategy = require('./localStrategy');
// const kakaoStrategy = require('./kakaoStrategy');
// const {User} = require('../models');

// module.exports = (passport) => {
//     passport.serializeUser((user,done) => {
//         done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         user = await User.findOne({where: id})
//         user => done(null,user);
//     } catch (error) {
//         error => done(err);
//     }
// });

// localStrategy(passport);
// kakaoStrategy(passport);

// }

const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followers',
        },
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followings',
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local(passport);
  kakao(passport);
};
