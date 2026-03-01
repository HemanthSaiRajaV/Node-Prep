const express = require('express');

const app = express();
app.use(express.json());

// CREATE
app.post('/users', (req, res) => {
    res.send("User Created");
});

// READ
app.get('/users', (req, res) => {
    res.send("User List");
});

// UPDATE
app.put('/users/:id', (req, res) => {
    res.send("User Updated");
});

// DELETE
app.delete('/users/:id', (req, res) => {
    res.send("User Deleted");
});