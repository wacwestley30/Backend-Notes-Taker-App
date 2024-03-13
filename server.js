// Imports and Variables
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);