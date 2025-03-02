const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Create or open the database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    quantity INTEGER
  )`);
});

// Middleware to parse JSON
app.use(express.json());

// CRUD operations
app.post('/items', (req, res) => {
  const { name, description, quantity } = req.body;
  db.run(`INSERT INTO items (name, description, quantity) VALUES (?, ?, ?)`, [name, description, quantity], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID });
  });
});

app.get('/items', (req, res) => {
  db.all(`SELECT * FROM items`, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(rows);
  });
});

app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM items WHERE id = ?`, id, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ deletedID: id });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
