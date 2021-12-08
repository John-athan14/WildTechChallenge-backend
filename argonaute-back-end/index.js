const connection = require('./db-config');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log(
      'connected to database with threadId :  ' + connection.threadId
    );
  }
});

app.use(express.json());

app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(200).send('Error retrieving a argonaute from database');
    } else {
      if (results.length) res.json(results);
      else res.status(404).send('argonaute not found');
    }
  });
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  connection.query(
    'INSERT INTO users (name) VALUES (?)',
    [name],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error of the user');
      } else {
        res.status(201).send('User successfully');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
