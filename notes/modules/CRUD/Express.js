import express from 'express';

const app = express();
app.use(express.json());

// simple CRUD endpoints (these won't run unless the module is started with `app.listen`)
app.post('/users', (req, res) => {
    res.send("User Created");
});
app.get('/users', (req, res) => {
    res.send("User List");
});
app.put('/users/:id', (req, res) => {
    res.send("User Updated");
});
app.delete('/users/:id', (req, res) => {
    res.send("User Deleted");
});

// export the app in case another module wants to mount or start it
export default app;