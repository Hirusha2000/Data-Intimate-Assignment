// controllers/userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

class UserController {
    static async createUser(req, res) {
        try {
            const { username, password } = req.body;
            const userExists = await User.getUserByUsername(username);
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const user = await User.createUser({ username, password });
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { username, password } = req.body;
            const user = await User.updateUser(userId, { username, password });
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await User.deleteUser(userId);
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = UserController;
