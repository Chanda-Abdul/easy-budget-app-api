const path = require("path");
const express = require("express");
const { v4: uuid } = require('uuid');
const logger = require('../logger')
const ExpenseService = require('../services/expense-service');
const expenseRouter = express.Router();
const jsonParser = express.json()
const knex = require("knex");

const serializeExpense = expense => ({
  id: expense.id,
  name: expense.name,
  amount: expense.amount,
  type_id: expense.type_id,
  category: expense.category,
})

expenseRouter
.route('/api/expenses')
.get((req, res, next) => {
  ExpenseService.getAllExpenses(
    req.app.get('db')
  )
  .then(expenses => {
    res.json(expenses.map(serializeExpense))
  })
  .catch(next)
.post(jsonParser, (req, res, next) => {
  const { name, amount, type_id, category="Discretionary", date=false } = req.body;
//validation code here? (review POST and DELETE request to add validation)
const id = uuid();
//set date to now
const newExpense = {
  id, 
  name, 
  amount, 
  category, 
  type_id, 
  date
};
for (const [key, value] of Object.entries(newExpense)) {
  if (value == null) {
  return res.status(400).json({
    error: { message: `Missing '${key}' in request body` }
  })
}
}
ExpenseService.insertExpense(
  req.app.get('db'),
newExpense
)
.then(expense => {
  res
  .status(201)
  .location(path.posix.join(req.originalUrl, `/${expense.id}`))
  .json(serializeExpense(expense))
})
.catch(next)
  })
})

expenseRouter
.route('/api/expenses/:expense_id').all((req, res, next) => {
  ExpenseService.getById(
    req.app.get('db'), req.params.expense_id
  ).then(expense => {
    if(!expense) {
      return res.status(404).json({
        error: { message: `Expense doesn't exist` }
      })
    }
    res.expense = expense //save the expense for the next middleware
next() //don't forget to call next so the next middleware happens!
  })
  .catch(next)
})
.get((req, res, next) => {
  res.json({
    id: res.expense.id,
    name: res.expense.name,
    type_id: res.expense.type_id,
    category: res.expense.category,
    date: res.expense.date
  })
  
  }).delete((req, res, next) => {
    ExpenseService.deleteExpense(
      req.app.get('db'), 
      req.params.expense_id
    )
    .then(numRowsAffected => {
      res.status(204).end()
    })
    .catch(next) 
}).patch(jsonParser, (req, res, next) => {
  const { name, amount, type_id, category } = req.body
  const expenseToUpdate = { name, amount, type_id, category }
  const numberOfValues = Object.values(expenseToUpdate).filter(Boolean).length
  if (numberOfValues === 0) {
    return res.status(400).json({
      error: {
        message: `Request body must contain either 'title', 'style' or 'content'`
      }
    })
  }

  ExpenseService.updateArtile(
    req.app.get('db',
    req.params.expense_id,
    expenseToUpdate)
    )
    .then(numRowsAffected => {
      res.status(204)
      .end()
      .catch(next)
    })
});
  
  module.exports = expenseRouter;