const localStrategy = require('./localStrategy');
const kakaoStrategy = require('./kakaoStrategy');
const {User} = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user,done) => {
        done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        user = await User.findOne({where: id})
        user => done(null,user);
    } catch (error) {
        error => done(err);
    }
});

localStrategy(passport);
kakaoStrategy(passport);

}

