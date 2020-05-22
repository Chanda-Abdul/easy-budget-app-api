require("dotenv").config();
const knex = require('knex')
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const { NODE_ENV, CLIENT_ORIGIN, PORT, DB_URL } = require("./config");
const helmet = require("helmet");

//import routers
const expenseRouter = require('./routes/expense-router')
// const createRouter = require('./routes/create-router')
const db = knex({
  client: 'pg',
  connection: DB_URL,
})

const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
const knexTest = db.select().table('expense_type');

app.set('db', db)
app.use(expenseRouter)
// app.use(createRouter)
app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json())
app.use(cors({
  origin: CLIENT_ORIGIN
})
);


// console.log(knexTest);
console.log(PORT, DB_URL);


// //link to routers?services
// app.use('/api/component1', component1Router);

//error handler middleware, move to middleware folder later
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

// //endpoints => move later
// app.get('/create', (req, res) => {

// })
// //budget endpoint => move later
// app.get('/budget', (req, res) => {
//   //search options by type or category
  
// })

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
});


module.exports = app;







