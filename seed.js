const db = require('./database');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const users = [
  {name:'Mario', surname:'Rossi', username:'stu1', password:'1234', role:'student', class:'A'},
  {name:'Luca', surname:'Bianchi', username:'prof1', password:'abcd', role:'professor', class:'A'},
  {name:'Giulia', surname:'Verdi', username:'coord1', password:'coord', role:'coordinator', class:''},
  {name:'Admin', surname:'Preside', username:'admin', password:'admin', role:'admin', class:''}
];

users.forEach(async (u) => {
  const hash = await bcrypt.hash(u.password, saltRounds);
  db.run('INSERT INTO users(name,surname,username,password,role,class) VALUES(?,?,?,?,?,?)',
    [u.name,u.surname,u.username,hash,u.role,u.class]);
});

console.log('Utenti iniziali creati.');
