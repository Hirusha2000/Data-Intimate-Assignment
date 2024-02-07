// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/userModel');

class AuthController {
    static async register(req, res) {
        try {
            const { username, password } = req.body;
            const userExists = await User.getUserByUsername(username);
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const user = await User.createUser({ username, password });
            const token = jwtUtils.generateToken({ id: user.insertId, username });
            res.status(201).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.getUserByUsername(username);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const passwordMatch = bcrypt.compareSync(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwtUtils.generateToken({ id: user.id, username });
            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = AuthController;
