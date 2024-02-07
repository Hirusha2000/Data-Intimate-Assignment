// models/userModel.js
const db = require('../db/db');

class User {
    static createUser(userData) {
        return new Promise((resolve, reject) => {
            const { username, password } = userData;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(query, [username, hashedPassword], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static getUserById(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            db.query(query, [userId], (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        });
    }

    static updateUser(userId, userData) {
        return new Promise((resolve, reject) => {
            const { username, password } = userData;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
            db.query(query, [username, hashedPassword, userId], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static deleteUser(userId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM users WHERE id = ?';
            db.query(query, [userId], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = User;
