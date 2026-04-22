const crypto = require('crypto');
const CryptoJS = require('crypto-js');

function aes_encrypt_crypto(text, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function aes_encrypt_js(text, key, iv) {
    const keyHex = CryptoJS.enc.Hex.parse(Buffer.from(key).toString('hex'));
    const ivHex = CryptoJS.enc.Hex.parse(iv.toString('hex'));
    const encrypted = CryptoJS.AES.encrypt(text, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
}

module.exports = { aes_encrypt_crypto, aes_encrypt_js };