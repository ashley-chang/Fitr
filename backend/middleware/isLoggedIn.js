const express = require('express');
const passport = require('passport');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({
      user: null
    });

}

module.exports = isLoggedIn;
