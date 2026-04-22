const { performance } = require('perf_hooks'); 
const { aes_encrypt_crypto, aes_encrypt_js } = require('../example/aes_crypto'); 

jest.setTimeout(120000); 

describe('Порівняння продуктивності AES-256: crypto vs crypto-js', () => {
    test('1000 ітерацій шифрування 1 MiB рядка', () => {
        const text = 'a'.repeat(1024 * 1024); 
        const key = '12345678901234567890123456789012';
        const iv = Buffer.alloc(16, 0);

        const t0Crypto = performance.now();
        for (let i = 0; i < 1000; i++) {
            aes_encrypt_crypto(text, key, iv);
        }
        const cryptoMs = performance.now() - t0Crypto;

        const t0Js = performance.now();
        for (let i = 0; i < 1000; i++) {
            aes_encrypt_js(text, key, iv);
        }
        const jsMs = performance.now() - t0Js;

        console.log(`Crypto (Node.js): ${cryptoMs.toFixed(2)} ms`); 
        console.log(`Crypto-JS: ${jsMs.toFixed(2)} ms`);

        expect(cryptoMs).toBeLessThan(110000); 
        expect(jsMs).toBeLessThan(150000);
    });
})