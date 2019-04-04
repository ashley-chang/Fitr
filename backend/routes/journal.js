const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const JournalEntry = require('../models/journal-entry');

// /journal-entries

// Fetch all journal entries
router.get('/', (req, res) => {
  // Retrieve entries from user
  JournalEntry.find({ userId: req.user._id }).exec().then((entries) => {
    return res.status.send(entries);
  }).catch((err) => {
    console.log(err);
    return res.status(500).end();
  });
});

// Fetch a specific journal entry
router.get('/:entryId', (req, res) => {
  JournalEntry.findById(req.params.entryId).exec().then((entry) => {
    return res.status(200).send(entry);
  }).catch((err) => {
    console.log(err);
    return res.status(500).end();
  });
})

/*********************************************************************
  Updating/saving journal entries--get data: title, content, entryId
**********************************************************************/

// Save a new journal entry
router.post('/', (req, res) => {
  // Create a new journal entry and store in variable
  const journalEntry = new JournalEntry({
    userId: req.user._id,
    title: req.body.title,
    content: req.body.content,
  });
  // Save the newly created entry
  journalEntry.save().then((entry) => {
    return res.status(200).send({
      entryId: entry._id
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).end();
  });
})

// Update a journal entry
router.patch('/:entryId', (req, res) => {
  // Find the specified journal entry through the given entryId in parameters/req.body
  JournalEntry.findOneAndUpdate({ _id: req.params.entryId }, {
    title: req.body.title,
    content: req.body.content
  }).exec().then((entry) => {
    return res.status(200).send(entry);
  }).catch((err) => {
    console.log(err);
    return res.status(500).end();
  });
})

module.exports = router;
