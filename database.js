const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./registro.db');

db.serialize(() => {
  // Utenti
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    surname TEXT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    class TEXT
  )`);

  // Voti
  db.run(`CREATE TABLE IF NOT EXISTS grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    subject TEXT,
    grade INTEGER,
    date TEXT,
    entered_by INTEGER,
    FOREIGN KEY(student_id) REFERENCES users(id),
    FOREIGN KEY(entered_by) REFERENCES users(id)
  )`);

  // Note
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    type TEXT,
    description TEXT,
    date TEXT,
    entered_by INTEGER,
    FOREIGN KEY(student_id) REFERENCES users(id),
    FOREIGN KEY(entered_by) REFERENCES users(id)
  )`);

  // Presenze/assenze/ritardi
  db.run(`CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    type TEXT,
    date TEXT,
    entered_by INTEGER,
    FOREIGN KEY(student_id) REFERENCES users(id)
  )`);

  // Compiti
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class TEXT,
    subject TEXT,
    description TEXT,
    due_date TEXT,
    entered_by INTEGER
  )`);

  // Documenti
  db.run(`CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    link TEXT,
    class TEXT,
    subject TEXT,
    entered_by INTEGER
  )`);
});

module.exports = db;
