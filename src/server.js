const knex = require('knex')
const express = require('express');
const app = express();
const {PORT, DB_URL } = ('./config');

const db = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

app.set('db', db)

// app.get('/api/*', (req, res) => {
//     res.json({ok: true});
// });

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
});

module.exports = { app };