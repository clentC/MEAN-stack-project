const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost', =Clent Desktop
  user: 'root', = 
  password: 'password', = CLENT
  database: 'my_database', = CLENT
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});


app.post('/add-user', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) {
      res.status(500).send('Error inserting data');
    } else {
      res.status(201).send('Data inserted');
    }
  });
});


app.get('/get-users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});