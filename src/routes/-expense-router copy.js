const express = require('express')
// const { v4: uuid } = require('uuid')
const expenseRouter = express.Router()
const bodyParser = express.json()

expenseRouter
.route('/expense')
.get((req, res) => {
//move implementation logic here
}).post(bodyParser, (req, res) => {
  //move implementation logic here
})

expenseRouter.route('/expense/:id').get((req, res) => {
  //move implementation logic here
}).delete((req, res) => {
  //move implementation logic here
})

module.exports = expenseRouter