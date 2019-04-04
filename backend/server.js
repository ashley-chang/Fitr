const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

// Require User Model
const User = require('./models/user');
// Require Passport file
require('./config/passport');

const app = express();

const PORT = process.env.port || 3001;

// MongoDB / Mlab Database
const dbRoute = process.env.MONGOLAB_URI;
mongoose.connect(dbRoute, {
  useNewUrlParser: true
});

let db = mongoose.connection;
db.once('open', () => console.log("Connected to the database"));
db.on('error', console.error.bind(console, "MongoDB connection error"));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
// TODO: Store secret session in mongostore
// session middleware creates session, sets session cookie, creates session object in req object
// access in req.session
app.use(session({
  secret: "secretSession",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 120 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser/deserializeUser
// serialize: store user id to req.session.passport.user = { id: __ }
// deserialize: check if user stored to database, then assign to request as req.user = {user object}

app.use((req, res, next) => {
  // global variable to tell if authenticated
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.session = req.session;
  // login variable available in all views
  next();
})


// Routes
app.use('/', require('./routes/index'));
app.use('/journal-entries', require('./routes/journal'));

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
