const express = require('express')

const createRouter = express.Router()
const bodyParser = express.json()

createRouter
.route('/create')
.put((req, res) => {
//move implementation logic here
}).post(bodyParser, (req, res) => {
  //move implementation logic here
})


module.exports = createRouter