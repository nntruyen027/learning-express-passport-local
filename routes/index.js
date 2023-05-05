var express = require('express');
var passport = require('../config/passport');
const { render } = require('../app');
const { renderFile } = require('ejs');
var router = express.Router();

router.use(passport.initialize());
router.use(passport.session());



/* GET home page. */
router.get(('/'), function (req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
