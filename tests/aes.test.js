const { aes_encrypt_crypto, aes_encrypt_js } = require('../example/aes_crypto');

describe('Тестування AES-256-CBC', () => {
    const text = 'Hello AES';
    const key = '12345678901234567890123456789012'; 
    const iv = Buffer.alloc(16, 0); 

    test('Тест 1: Порівняння результатів двох бібліотек', () => {
        const res1 = aes_encrypt_crypto(text, key, iv);
        const res2 = aes_encrypt_js(text, key, iv);
        expect(res1).toBe(res2); 
    });
});