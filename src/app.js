require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { NODE_ENV, CLIENT_ORIGIN } = require("./config");
const helmet = require("helmet");
const winston = require('winston');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors({
  origin: CLIENT_ORIGIN
})
);

// //import routers
// const componentRouter = require('./component1/component1-router')

// //link to routers
// app.use('/api/component1', component1Router);

function handleGetExpenses(req, res) {
  res.send('Hello, expenses coming right up!')
}

app.get("/expenses", handleGetExpenses);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//logger middleware
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

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

//endpoints => move later
app.get('/create', (req, res) => {

})
//budget endpoint => move later
app.get('/budget', (req, res) => {
  //search options by type or category
  
})

module.exports = app;
