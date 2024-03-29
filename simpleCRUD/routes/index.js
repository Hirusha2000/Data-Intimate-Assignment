
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db/db');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the CRUD API with JWT authentication!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


