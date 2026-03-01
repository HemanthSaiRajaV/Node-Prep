const cluster = require('cluster');   // Import cluster module
const os = require('os');             // Import OS module
const express = require('express');   // Import Express

const totalCPUs = os.cpus().length;   // Get number of CPU cores

// Check if current process is Primary (Master)
if (cluster.isPrimary) {

    console.log("total CPUS OF PC", totalCPUs);

    // Create worker processes equal to number of CPU cores
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();   // Fork = create new worker process
    }

} else {

    // Worker process code runs here
    const app = express();
    const port = 3001;

    // Simple API route
    app.get('/', (req, res) => {
        return res.json({
            message: `Hi! you are on home screen with port No: ${port} and Server Instance ID is created on ${process.pid}`
            // process.pid = Unique process ID of worker or new instance for server 
        });
    });

    // Start server
    app.listen(port, () => {
        console.log(`Worker listening on port ${port}`);
    });
}