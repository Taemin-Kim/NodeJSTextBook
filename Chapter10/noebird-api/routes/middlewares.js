const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
};


exports.isNotLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify = (req.headers.authorization, process.env.JWT_SECRET); //디코디드는 그냥 변수임
        return next();
    } catch (error) {

    if(error.name === 'TokenExipiredError') { //토큰 유효시간 초과
        return res.status(419).json({
            code:419,
            message: '토큰 만료',
        });
    }
    return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰',
    });

    }
}