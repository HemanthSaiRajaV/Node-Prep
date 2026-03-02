import express from "express"
import fs from "fs"
import status from "express-status-monitor"
import { Transform, PassThrough } from "stream"

const app = express();
const port = 3002;

app.use(status());

// helper transform stream that upper-cases content (or apply any modification)
const modifyStream = new Transform({
    transform(chunk, encoding, callback) {
        // convert buffer to string and modify it
        const data = chunk.toString().toUpperCase();
        callback(null, data);
    }
});

app.get('/', (req, res) => {
    const readPath = "./notes/modules/pipes/50mb.json"; // be careful with case
    const writePath = "./notes/modules/pipes/output.json";

    const readStream = fs.createReadStream(readPath, { encoding: "utf-8" });
    const writeStream = fs.createWriteStream(writePath, { encoding: "utf-8" });

    // use a PassThrough to tee the modified data to both the client and a file
    const tee = new PassThrough();

    // pipe: read -> modify -> tee -> write
    readStream.pipe(modifyStream).pipe(tee);
    tee.pipe(writeStream);      // write modified data to a file
    tee.pipe(res);              // and also send it in the HTTP response

    // handle end / errors
    writeStream.on('finish', () => {
        console.log('Finished writing modified file');
    });
    readStream.on('error', (err) => {
        console.error('Read error', err);
        res.status(500).send('Read error');
    });
    writeStream.on('error', (err) => {
        console.error('Write error', err);
    });
});

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port} & status monitor at http://localhost:3002/status`);
});
