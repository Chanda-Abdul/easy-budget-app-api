const path = require("path");
const express = require("express");
const { v4: uuid } = require('uuid');
const logger = require('../logger')
const ExpenseService = require('../services/expense-service');
const expenseRouter = express.Router();
const jsonParser = express.json()
const knex = require("knex");

// const expenses = [];

expenseRouter
.route('/expenses').get((req, res, next) => {
  ExpenseService.getAllExpenses(
    req.app.get('db')
  )
  .then(expenses => {
    res.json(expense)
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
ExpenseService.insertExpense(
  req.app.get('db'),
newExpense
)
.then(expense => {
  res
  .status(201)
  .location(`/expenses/${expense.id}`)
  .json(expense)
})
.catch(next)
  })
})

expenseRouter
.route('/expenses/:id')
.get((req, res, next) => {
  const knexInstance = req.app.get('db')
  ExpenseService
  .getById(knexInstance, req.params.expenseId)
  .then(expense => {
    if (!expense) {
      return res.status(404).json({
        error: { message: `Expense doesn't exist` }
      })
    }
    res.json(expense)
  })
  .catch(next)
})
.delete((req, res) => {
  /* insert code here*/
  //delete expenses from budget_expense table
  //need to make this work with /api/expense/:expenseId
  const { id } = req.params;
  
  const index = expenses.findIndex(e => e.id === id);

  //make sure there is actually data at that id
  if (index === -1 ) {
    return res
    .status(404)
    .send('Expense not found');
  }

  handleGetExpenses.splice(index, 1);
  
  res
  .status(204)
  .end();
});

expenseRouter.put('/', (req, res) => {
  //update budget_expense table with new expense
  res.send('PUT Request received');
})
  
  module.exports = expenseRouter;