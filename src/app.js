require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { NODE_ENV } = require("./config");
const helmet = require("helmet");
const winston = require('winston');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// //import routers
// const componentRouter = require('./component1/component1-router')

// //link to routers
// app.use('/api/component1', component1Router);

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

module.exports = app;
