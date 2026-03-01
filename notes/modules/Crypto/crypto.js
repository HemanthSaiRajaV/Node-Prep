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