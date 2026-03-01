import express from "express"
import fs from "fs"
import status from "express-status-monitor"

const app = express();
const port = 3002;

app.use(status());

// ? without stream 
app.get('/', (req, res) => {
    fs.readFile("./notes/modules/Streams/50mb.json", (error, data) => {
        res.end(data);
    });
});

// ? with stream 

app.get('/', (req, res) => {
    const stream = fs.createReadStream("./notes/modules/Streams/50mb.json", "utf-8");
    stream.on("data", (chunk) => res.write(chunk));
    stream.on("end", () => res.end());

});

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port} & status monitor at http://localhost:3002/status`);
});
