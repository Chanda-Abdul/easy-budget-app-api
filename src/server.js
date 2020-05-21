const knex = require('knex')
const express = require('express');

const { PORT, DB_URL } = require('./config');
const db = knex({
    client: 'pg',
    connection: DB_URL,
})
const app = express();
const knexTest = db.select().table('expense_type');

// console.log(knexTest);
console.log(PORT, DB_URL);

app.set('db', db)

// app.get('/api/*', (req, res) => {
//     res.json({ok: true});
// });

function handleGetExpenses(req, res) {
    res.send('Hello, expenses coming right up!')
  }
  
  app.get('/expenses', handleGetExpenses)
  
  app.get('/', (req, res) => {
    res.send("Hello, world!");
  });

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
});

module.exports = { app };