import os from "os";

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Cores:", os.cpus().length);
console.log("Total Memory:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Free Memory:", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Hostname:", os.hostname());
console.log("System Uptime:", os.uptime(), "seconds");

const networkInterfaces = os.networkInterfaces();

let ipAddress;

for (const interfaceName in networkInterfaces) {
    for (const network of networkInterfaces[interfaceName]) {
        if (network.family === 'IPv4' && !network.internal) {
            ipAddress = network.address;
        }
    }
}

console.log("IP Address:", ipAddress);