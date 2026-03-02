import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 1️⃣ join() - Safely joins path segments
const filePath = path.join(__dirname, 'users', 'data.txt');
console.log('CurrentDirectory filepath:',filePath); 

// 2️⃣ resolve() - Creates absolute path
const absolutePath = path.resolve('data.txt');
console.log(" Absolute full path of data.txt:",absolutePath);

// 3️⃣ basename() - Gets file name only
console.log("Output:",path.basename('node ./notes/modules/Path/test.js'));

// 4️⃣ dirname() - Gets directory path
console.log("CurrentDirectory:",path.dirname('node ./notes/modules/Path/test.js'));

// 5️⃣ extname() - Gets file extension
console.log(".html:",path.extname('index.html'));

// 6️⃣ parse() - Breaks path into parts
const parsed = path.parse('node ./notes/modules/Path/test.js');
console.log("data:",parsed);

// 7️⃣ format() - Converts object back to path
const formatted = path.format(parsed);
console.log("Output formatted:",formatted);