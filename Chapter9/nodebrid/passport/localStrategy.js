const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
    passport.user(new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const exUser = await User.findOne({where: {email}});
            
        } catch (error) {
            
        }
    }
    
    ));


    /*
     * Todo: 
     * 
    */
}