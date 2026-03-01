import express from 'express';

const app = express();
app.use(express.json());

// CREATE
app.post('/users', (req, res) => {
    // Validate payload
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: "Name and email required" });
    }

    const newUser = {
        id: 1,
        name: req.body.name,
        email: req.body.email
    };

    // 201 = Resource Created
    res.status(201).json(newUser);
});

// READ
app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: "Jane", email: "jane@example.com" }
    ];

    res.status(200).json(users);
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const updatedUser = {
        id: req.params.id,
        ...req.body
    };

    res.status(200).json(updatedUser);
});

// DELETE
app.delete('/users/:id', (req, res) => {

    // Option 1: Return message
    res.status(200).json({ message: "User deleted" });

    // Option 2 (REST standard): No content
    // res.status(204).send();
});

export default app;