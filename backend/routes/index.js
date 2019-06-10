const express = require('express');
const passport = require('passport');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', (req, res) => {

});

router.get('/dashboard', isLoggedIn, (req, res) => {
  // return res.status(200).json({
  //   user: req.user
  // });
});

router.post('/login', passport.authenticate('local.login'), (req, res) => {
  res.status(200).json({ user: req.user });
});

router.post('/register', passport.authenticate('local.register'),
  (req, res) => {
    res.status(200);
});


module.exports = router;
