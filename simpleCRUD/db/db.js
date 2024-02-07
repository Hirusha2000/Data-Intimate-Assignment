
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'simplecrud',
    connectionLimit: 10
});

module.exports = pool;
