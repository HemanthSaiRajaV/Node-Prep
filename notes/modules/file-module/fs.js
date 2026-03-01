import { error } from "console";
import fs from "fs";

// creates the sync file, whenever user changes the data will be updated sync way  
fs.writeFileSync('./notes/modulesES/coreModules/file-module/output/syncFile.txt', 'hi hemanth');

// creates the async file, whenever user changes the data will be updated sync way  
fs.writeFile('./notes/modulesES/coreModules/file-module/output/asyncFile.txt', 'async data have created',(err)=>{
    if(err){
        console.log('print', error)
    }else{
        console.log('created async file')
    }
})

// read the data from the file. whenever user changes the data will be updated sync way  
const readMe = fs.readFileSync('./notes/modulesES/coreModules/file-module/output/readFile.txt', 'utf-8');
console.log('fileData', readMe)

// read the data from the file. whenever user changes the data will be updated async way but syntex is different
fs.readFile('./notes/modulesES/coreModules/file-module/output/readFile.txt', 'utf-8', (err, res)=>{
    if(err){
        console.log('printError', err);
    }else{
        console.log('reading file async is done', res);
    }
})

// write in existing file. known as apend whenever user write new context in file sync way

fs.appendFileSync('./notes/modulesES/coreModules/file-module/output/syncFile.txt', ', How are you?')


// write in existing file. known as apend whenever user write new context in file async way

fs.appendFile('./notes/modulesES/coreModules/file-module/output/asyncFile.txt', ' 8888888 92', (err, res)=>{
    if(err){
        console.log('printError', err);
    }else{
        console.log('adding new context to file in async approch', res);
    }
});

// delete a file (ignore if it doesn't exist)
try {
    fs.unlinkSync('./notes/modulesES/coreModules/file-module/output/delete.txt');
} catch (e) {
    if (e.code !== 'ENOENT') {
        throw e;
    }
}
