const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const generatePassword = require('generate-password');

const encryptedData = async (password) => {
    try {
        const secretKey = "@#allias#@";
        const fixedSalt = 'mobiliz';
        const key = crypto.scryptSync(secretKey, fixedSalt, 32); // Derive a key from the secret key and fixed salt
        const cipher = crypto.createCipheriv('aes-256-ctr', key, Buffer.alloc(16, 0)); // Create a cipher
        let encryptedPassword = cipher.update(password, 'utf8', 'hex'); // Encrypt the password
        encryptedPassword += cipher.final('hex');
        return encryptedPassword;
    } catch (e) {
        return e;
    }   
};

const decryptedData = async (encryptedPassword) => {
    try {
        const secretKey = "@#allias#@";
        const fixedSalt = 'mobiliz'; // Use the same fixed salt as used for encryption
        const key = crypto.scryptSync(secretKey, fixedSalt, 32); // Derive the key from the secret key and fixed salt
        const decipher = crypto.createDecipheriv('aes-256-ctr', key, Buffer.alloc(16, 0)); // Create a decipher
        let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8'); // Decrypt the password
        decryptedPassword += decipher.final('utf8');
        return decryptedPassword;
    } catch (e) {
        console.error('Error during decryption:', e);
        throw e; // Rethrow the error to be handled by the caller
    }
};


function generateJwtToken(payload, secretKey, expiresIn) {
    // Create the JWT token with the provided payload and secret key
    return jwt.sign(payload, secretKey, { expiresIn });
  }
  function decodeToken(token, secretKey) {
    // Verify the token and extract payload
    const decoded = jwt.verify(token, secretKey); // Replace 'your-secret-key' with your actual secret key

    // Extract user ID from payload
    const userId = decoded.id; // Assuming 'id' is the key containing the user ID in the payload
    return userId;
}
  
function generateRandomPassword() {
const password = generatePassword.generate({
length: 12,
numbers: true,
symbols: true,
lowercase: true,
uppercase: true,
});
return password;
}

module.exports = {
    encryptedData,
    decryptedData,
    generateJwtToken,
    generateRandomPassword,
    decodeToken
}