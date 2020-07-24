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


// passport는 req.session.passport.user에 데이터를 저장한다 첫번째 들어오는데이터는 이의 줄임말이며 해당 객체에서 id값을 인자로 deserializeUser로 넘겨준다
// deserializeUser serializeUser에서 받은값을 가지고 어떠한 작업을 수행할 수 있다. 현재는 DB 검색후 찾은 유저의 내용을 넘겨줌
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
