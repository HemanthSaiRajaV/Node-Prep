import express from "express"
import fs from "fs"
import status from "express-status-monitor"

const app = express();
const port = 3003;
app.use(status());


// 1. Buffer Concatenation
app.get('/buffer-concat', (req, res) => {
    const buf1 = Buffer.from("Node ");
    const buf2 = Buffer.from("JS ");
    const buf3 = Buffer.from("Buffer");
    
    const result = Buffer.concat([buf1, buf2, buf3]);
    res.send(result.toString());
});

// 2. Stream Reading Large File
app.get('/stream-read', (req, res) => {
    const stream = fs.createReadStream("./notes/modules/Buffer/50mb.json");
    
    stream.on("data", (chunk) => {
        res.write(chunk);
    });
    
    stream.on("end", () => res.end());
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} & stress on http://localhost:3003/status`);
    console.log(`\nBuffer & Stream Routes:`);
    console.log(`  GET /buffer-concat - Concatenate multiple Buffers`);
    console.log(`  GET /stream-read - Stream read large file`);
});
