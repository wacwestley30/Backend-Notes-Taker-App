// Imports
const express = require('express');
const path = require('path');
const router = express.Router();

// GET request for the /notes endpoint to take user to notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// GET request to handle all other endpoints using * to redirect the user back to index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;