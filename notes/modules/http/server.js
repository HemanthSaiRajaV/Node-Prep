import app from '../CRUD/Express.js';

// create a simple HTTP server that listens on port 3000 and forwards
// all requests to the Express application defined in ../CRUD/Express.js

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
});
