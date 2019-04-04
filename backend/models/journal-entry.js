const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalEntry = new Schema({
  userId: Schema.ObjectId,
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("JournalEntry", journalEntry);
