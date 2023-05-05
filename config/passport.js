const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = require('../models/user');

//Cấu hình chiến lược xác thực local
passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
        user.findOne({ username: username })
            .then(data => {
                if (!data) {
                    return done(null, false);
                }

                if (!data.verifyPassword(password)) {
                    return done(null, false);
                }
                return done(null, data)
            })
            .catch(err => {
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