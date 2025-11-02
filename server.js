const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- LOGIN ---
app.post('/login', (req, res) => {
  const {username, password} = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({error: err.message});
    if (!user) return res.status(401).json({error: 'Username non trovato'});
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({error: 'Password errata'});
    res.json(user);
  });
});

// --- INSERIMENTO VOTI ---
app.post('/grades', (req, res) => {
  const {student_id, subject, grade, date, entered_by} = req.body;
  db.run(
    'INSERT INTO grades(student_id, subject, grade, date, entered_by) VALUES (?, ?, ?, ?, ?)',
    [student_id, subject, grade, date, entered_by],
    function(err) {
      if (err) return res.status(500).json({error: err.message});
      res.json({id: this.lastID});
    }
  );
});

// --- CALCOLO MEDIA ---
app.get('/students/:id/average', (req, res) => {
  const student_id = req.params.id;
  db.get('SELECT AVG(grade) as media FROM grades WHERE student_id = ?', [student_id], (err, row) => {
    if (err) return res.status(500).json({error: err.message});
    res.json({student_id: student_id, media: row.media});
  });
});

// --- ENDPOINT PER ALTRE FUNZIONALITÀ ---
// Puoi aggiungere note, presenze, compiti e documenti con lo stesso schema

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server avviato su ${PORT}`));
