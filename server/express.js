const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '', 
  database: 'racetracker',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/register', async (req, res) => {
  const { email, password, age } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (email, password, age) VALUES (?, ?, ?)';
  
  db.query(query, [email, hashedPassword, age], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send({ message: 'Email already exists' });
      }
      return res.status(500).send({ message: 'Error registering user' });
    }
    res.status(201).send({ message: 'User registered' });
  });
});

app.post('/createrace-unofficial', async (req, res) => {
  const { userEmail, race, organier, price, date, country, address, forhindringer, distance, billet, website, elite, jrelite, uuid, heatinfo } = req.body;
  const query = 'INSERT INTO user_races (email, name, organizer, price, date, country, address, forhindringer, distance, billet, website, elite, jrelite, uuid, heatinfo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [userEmail, race, organier, price, date, country, address, forhindringer, distance, billet, website, elite, jrelite, uuid, heatinfo], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send({ message: 'Race already exists' });
      }
      return res.status(500).send({ message: 'Error registering race' });
    }
    res.status(201).send({ message: 'User registered' });
  });
});

app.post('/createrace-official', async (req, res) => {
  const { race, organier, price, date, country, address, forhindringer, distance, billet, website, elite, jrelite, uuid, heatinfo} = req.body;
  const query = 'INSERT INTO races (name, organizer, price, date, country, address, forhindringer, distance, billet, website, elite, jrelite, uuid, heatinfo ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [race, organier, price, date, country, address, forhindringer, distance, billet, website, elite, jrelite, uuid, heatinfo], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send({ message: 'Race already exists' });
      }
      return res.status(500).send({ message: 'Error registering race' });
    }
    res.status(201).send({ message: 'User registered' });
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error logging in' });
    }
    if (results.length > 0) {
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return res.send({ message: 'Login successful' });
      }
    }
    res.status(401).send({ message: 'Invalid credentials' });
  });
});

app.get('/users', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error fetching users' });
    }
    res.send(results);
  });
});

app.get('/races', (req, res) => {
  const query = 'SELECT * FROM races';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error fetching races' });
    }
    res.send(results);
  });
});


app.get('/userraces', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  const query = 'SELECT * FROM user_races WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error fetching races' });
    }
    res.send(results);
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
