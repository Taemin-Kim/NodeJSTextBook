exports.isLoggendIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash('loingError', '로그인이 필요합니다.');
        res.redirect('/');
    }
};


exports.isNotLoggedIn= (req, res, next) {
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}