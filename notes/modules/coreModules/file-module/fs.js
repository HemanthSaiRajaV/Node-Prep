import { error } from "console";
import fs from "fs";

// creates the sync file, whenever user changes the data will be updated sync way  
fs.writeFileSync('./notes/modules/coreModules/file-module/output/syncFile.txt', 'hi hemanth');

// creates the async file, whenever user changes the data will be updated sync way  
fs.writeFile('./notes/modules/coreModules/file-module/output/asyncFile.txt', 'async data have created',(err)=>{
    if(err){
        console.log('print', error)
    }else{
        console.log('created async file')
    }
})

// read the data from the file. whenever user changes the data will be updated sync way  
const readMe = fs.readFileSync('./notes/modules/coreModules/file-module/output/readFile.txt', 'utf-8');
console.log('fileData', readMe)

// read the data from the file. whenever user changes the data will be updated async way but syntex is different
fs.readFile('./notes/modules/coreModules/file-module/output/readFile.txt', 'utf-8', (err, res)=>{
    if(err){
        console.log('printError', err);
    }else{
        console.log('reading file async is done', res);
    }
})