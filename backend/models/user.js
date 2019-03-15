// Set up User Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
  // this model
  let user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword =  function(password, callback) {
  // callback(err, res)
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) return callback(err);
    callback(null, res);
  });
}

module.exports = mongoose.model("User", userSchema);
