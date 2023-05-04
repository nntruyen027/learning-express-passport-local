const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = require('../models/user');

//Cấu hình chiến lược xác thực local
passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
        user.findOne({ username: username })
            .then(data => {
                if (!data) {

                    console.log('Khong co data');
                    return done(null, false);
                }

                if (!data.verifyPassword(password)) {
                    console.log('mat khau sai')
                    return done(null, false);
                }

                console.log('Dung mat khau' + data.id)
                return done(null, data)
            })
            .catch(err => {
                console.log('Loi server')
                return done(err);
            })

    }
));

//Lưu thông tin người dùng vào session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    user.findById(id)
        .then(user => {
            done(null, user)
        })
        .catch(err => {
            done(err, null);
        })
});


module.exports = passport