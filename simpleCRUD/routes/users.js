

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection module


app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const result = await pool.query('UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *', [username, password, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete User
router.delete('/:id', async (req, res) => {
  // Implementation for deleting a user from the database
});

module.exports = router;
