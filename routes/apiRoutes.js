const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const uuid = require('../helpers/uuid');

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

    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
            return;
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        const notesString = JSON.stringify(notes, null, 2);
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

router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
            return;
        }
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        const notesString = JSON.stringify(notes, null, 2);
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