import crypto from "crypto";


// ? The below encryption function by using crypto will encrypt the input but output will be in hex value with changing everytime 

const encryption = (data) => {
    const logicToEncrypt = crypto.randomBytes(30).toString('hex');
    return `encryption of ${data} :::::::::: ${logicToEncrypt}`;
};

console.log('print encryption', encryption('Hemanth sai raja vanasetti'))

// 3b4b2f632a55148ee9a47ab8449b2b324adb1ee2d3d84d55292ae0e154bc
// 9050f4fe54cfc542a7c2c755eeb8e8645d3d835515bf008e8ca0a57d2ee8
// 77e720f1cebe777138744018e846164ec866c62cde749c582db87259762d


// ? The below encryptData function by using crypto will encrypt the input but output will be in hex value with same encrypted data

const encryptData = (data) => {
    const logicToEncrypt = crypto.createHash('sha256').update(data).digest('hex');
    return `encryption of ${data} :::::::::: ${logicToEncrypt}`;
}

console.log('print encryptData', encryptData('Hemanth sai raja vanasetti'))

// bd3c6b3b500cf3fa6f10dff3499d43d1188447275f5f86a619d49a3bd1864e7b
// bd3c6b3b500cf3fa6f10dff3499d43d1188447275f5f86a619d49a3bd1864e7b
// bd3c6b3b500cf3fa6f10dff3499d43d1188447275f5f86a619d49a3bd1864e7b


//? Simple encryption/decryption 

const key = crypto.createHash('sha256').update('your-secret-password').digest();
const iv = crypto.randomBytes(16);

const encryptAES = (data) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const encrypted = encryptAES('Hemanth sai raja vanasetti');
console.log('Encrypted random hex:', encrypted);

const decryptAES = (encrypted) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

const decrypted = decryptAES(encrypted);
console.log('Decrypted:', decrypted);


// Encrypted: 287a3512b801ccf3c53bd6afe46063885666ee315a1f8e38c06ae6f8b5553ef1
// Decrypted: Hemanth sai raja vanasetti

// Encrypted: 1e3b0ddc8caaab136a921f32131dcd8923f29c4a5e36ef2da75555607f3f1c7a
// Decrypted: Hemanth sai raja vanasetti