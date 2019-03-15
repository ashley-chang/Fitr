const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// User Sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Register New User
passport.use('local.register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  failureFlash: true
}, (req, email, password, done) => {
  // Add Validation here

  User.findOne({ 'email' : email }, (err, user) => {
    if (err) { return done(err); }
    if (user) {
      console.log('user already in use');
      return done(null, false, { message : 'Email already in use.' });
    }
    // Create new user
    const newUser = new User({ email, password });
    newUser.save((err, result) => {
      if (err) { return done(err); }
      return done(null, newUser);
    });
  });
}));

// Login Existing User
passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: "Email/password is invalid."});
    }
    // Found user, so check if password matches
    user.comparePassword(password, (err, res) => {
      if (err) {
        return done(err);
      }
      // Passwords do not match -- fail
      if (!res) {
        return done(null, false, req.flash('message', 'Email/password is invalid'));
      }
      // Passwords do match -- success
      return done(null, user);
    });
  });
}));
