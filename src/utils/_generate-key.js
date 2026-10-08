import crypto from 'crypto';

function generateApiKey(prefix = 'myapp') {
  const secret = crypto.randomBytes(32).toString('base64url');
  return `${prefix}_${secret}`;
}

function hashKey(apiKey) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

// Valider une clé contre son hachage
function isValidKey(incomingKey, storedHash) {
  const hash = hashKey(incomingKey);
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(storedHash)
  );
}

const key = generateApiKey('api_sk_dev');
console.log('Key to client:' + key); 

const hash = hashKey(key);
console.log('hash to db :' + hash); 

console.log('is valid key :' + isValidKey(key,hash)); 

/*
Key to client : api_sk_dev_qW_0LC0S4TcNEcbg8RiW0rI9mGvmIf9OJ48uLKR7Cpk
hash to db : :061fd4d43f0fe251a95cad3413f08609b7fb032053949ac9bf6c92ab3a1f7c42
*/