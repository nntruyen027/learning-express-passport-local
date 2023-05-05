var express = require('express');
var passport = require('../config/passport')
var router = express.Router();

//Hiển thị form đăng nhập
router.get('/', function (req, res, next) {
    res.render('login', { message: req.flash('loginMessage'), title: 'Đăng nhập' });
});

//Xử lý form đăng nhập
router.post('/', passport.authenticate('local-login', {
    failureRedirect: '/login',
}), (res, req, next) => {
    req.redirect('/');
});


module.exports = router;
