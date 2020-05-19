require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const winston = require('winston');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));

// //import routers
// const componentRouter = require('./component1/component1-router')

app.use(helmut());

app.use(cors());
// app.use(
//   cors({
//     origin: CLIENT_ORIGIN,
//   })
// );


// //link to routers
// app.use('/api/component1', component1Router);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get('/xss', (req, res) => {
  //revisit this later
})

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
