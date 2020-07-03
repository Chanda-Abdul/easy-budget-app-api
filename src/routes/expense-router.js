const path = require("path");
const express = require("express");
const { v4: uuid } = require('uuid');
const logger = require('../logger')
const ExpenseService = require('../services/expense-service');
const expenseRouter = express.Router();
const jsonParser = express.json()
const knex = require("knex");


expenseRouter
.route('/expenses')
.get((req, res, next) => {
  ExpenseService.getAllExpenses(
    req.app.get('db')
  )
  .then(expenses => {
    res.json({expenses})
  })
  .catch(next)
}).post((req, res, next) => {
  const newExpense = req.body;

  ExpenseService.insertExpense(
    req.app.get('db'), newExpense
  ).then(expense => {
    res.status(201)
    .location(path.posix.join(req.originalUrl, `/${expense.id}`))
    .json({expense})
  })
  .catch(next)
})


expenseRouter.route('/expenses/:expense_id')
.all((req, res, next) => {
  const knexInstance = req.app.get('db')
  const expense_id = req.params.expense_id
  ExpenseService.getById(
    req.app.get('db'), expense_id
  ).then(expense => {
    if(!expense) {
      return res.status(404).json({
        error: { message: `Expense doesn't exist`}
      })
    }
    res.expense = expense
    next() 
  })
  .catch(next)
}).get((req, res, next) => {
  res.json(res.expense)
})
.delete((req, res, next) => {
  const knexInstance = req.app.get('db')
  const expense_id = req.params.expense_id

  ExpenseService.deleteExpense(knexInstance, expense_id)
  .then(() => {
    res.status(204).end()
  }).catch(next)
}).patch((req, res, next) => {
  const knexInstance = req.app.get('db')
  const newExpenseData = req.body;
  const expense_id = req.params.expense_id;
  const numberOfValues = Object.values(newExpenseData).filter(Boolean).length
  if (numberOfValues === 0) {
    return res.status(400).json({
      error: {message: 'Request body missing information'}
    })
  }
  ExpenseService.updateExpense(knexInstance, expense_id, newExpenseData)
  .then(() => {
    res.status(204).end()
  })
  .catch(next)
})

  module.exports = expenseRouter;

