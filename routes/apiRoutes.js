// Imports
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const uuid = require('../helpers/uuid');

// GET request for /api/notes to parse the data
router.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// POST request for /api/notes for creating new notes and writing them to the db.json file
router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (!title || !text) {
        res.status(400).json({ error: 'Please enter both title and text'});
        return;
    }

    const newNote = {
        id: uuid(),
        title,
        text
    };

    // fs reads the file first
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
            return;
        }
        // parses the data
        const notes = JSON.parse(data);
        // pushes the new note to notes
        notes.push(newNote);
        const notesString = JSON.stringify(notes, null, 2);
        // fs writes the new file with the new note added to notes
        fs.writeFile(path.join(__dirname, '../db/db.json'), notesString, err => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Server Error' });
                return;
            }
            res.json(newNote);
        });
    });
});

// DELETE request using the unique IDs generated with each note
router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    // fs reads the file
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
            return;
        }
        // creates a notes variable for filtering the note by id
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        const notesString = JSON.stringify(notes, null, 2);
        // fs then writes the new file without the deleted note
        fs.writeFile(path.join(__dirname, '../db/db.json'), notesString, err => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Server Error' });
                return;
            }
            res.json({ success: true });
        });
    });
});

module.exports = router;