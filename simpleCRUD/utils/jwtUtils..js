// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const secretKey = 'hirusaaa';

module.exports = {
    generateToken: (payload) => jwt.sign(payload, secretKey, { expiresIn: '1h' }),
    verifyToken: (token) => jwt.verify(token, secretKey)
};
