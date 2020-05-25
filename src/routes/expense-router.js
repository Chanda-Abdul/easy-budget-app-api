const path = require("path");
const express = require("express");
const { v4: uuid } = require('uuid');
const logger = require('../logger')
const ExpenseService = require('../services/expense-service');
const expenseRouter = require('express').Router();

const expenses = [];

expenseRouter
.route('/api/expenses')
.get(ExpenseService.getAllExpenses).then(expense => {
  res.json(expenses)
}).catch(next)
.post((req, res, next) => {
  console.log(req.body);
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

// expenses.push(newExpense);

// res.send('All validation passed')
  return res.json({
    id, name, amount, type_id, category, date 
  })

  res
  .status(201)
  .location(`http://localhost:8080/user/${id}`)
  .json({id: id});

  
  // res.send('this is the post request')
  // //add new expense to budget_expense table
  // //how can I make this a function or an enpoint of /api/expenses
  // //get the data
  // const { name, amount, category, type, date=false } = req.body;
  // //validation
  // if (!name) {
  //   return res
  //   .status(400)
  //   .send('Expense name required');
  // }
  // if (!amount) {
  //   return res
  //   .status(400)
  //   .send('Dollar amount required');
  // }
  // if (!category) {
  //   return res
  //   .status(400)
  //   .send('Please choose a category');
  // }
  // //should I use this to validate the type and category options?
  // // const clubs = [
  // //   'Cache Valley Stone Society',
  // //   'Ogden Curling Club',
  // //   'Park City Curling Club',
  // //   'Salt City Curling Club',
  // //   'Utah Olympic Oval Curling Club'
  // // ];

  // // // make sure the club is valid
  // // if (!clubs.includes(favoriteClub)) {
  // //   return res
  // //     .status(400)
  // //     .send('Not a valid club');
  // // }
  // if (!type) {
  //   return res
  //   .status(400)
  //   .send('please select an expense type');
  // }
  // res.send('POST Request received');

 

  // expense.push(newExpense);

  // res.send('All validation passed');

  // res
  // .status(201)
  // .location(`http://localhost:8080/expense/${id}`)
  // .json(newExpense);
  /* insert code here*/
})

expenseRouter
.route('/api/expenses/:id')
.get(ExpenseService.getAllExpenses, (req, res) => {
  /* insert code here*/
  const { id } = req.params;
  console.log(id);
}
)
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










// function handlePostExpenses(req, res) {
//   res.send('Adding a new expense!')
// }

// expenseRouter.post('/api/expenses', handlePostExpenses)


// expenseRouter.get('/', (req, res) => {
//   res.send("Hello, world from expenseRouter!");
// });



// expenseRouter.get('/expenses', (req, res) => {
//   // return a list of expensess
// });

// expenseRouter.post('/expenses', (req, res) => {
//   // create a new expenses
// });


// const serializeComponent = (component) => ({
//     id: components.id,
//     component_label: components.component_label,
//     content: xss(components.content),
//     othercomponenet_id: components.othercomponenet_id,
//   });
  
//   componentsRouter
//     .route("/")
//     .get((req, res, next) => {
//       const knexInstance = req.app.get("db");
//       Components1Service.getAllComponents(knexInstance)
//         .then((components) => {
//           res.json(components.map(serializeComponents));
//         })
//         .catch(next);
//     })
//     .post(bodyParser, (req, res, next) => {
//       const { component_label, content, othercomponenet_id } = req.body;
//       const newComponent = { component_label, content, othercomponenet_id};
  
//       for (const [key, value] of Object.entries(newComponent))
//         if (value == null)
//           return res.status(400).json({
//             error: { message: `Missing '${key}' in request body` },
//           });
  
//       newComponent.othercomponenet_id = othercomponenet_id;
  
//       Components1Service.insertComponent(req.app.get("db"), newComponent)
//         .then((components) => {
//           res
//             .status(201)
//             .location(path.posix.join(req.originalUrl, `/${components.id}`))
//             .json(serializeComponents(components));
//         })
//         .catch(next);
//     });
  
//   componentsRouter
//     .route("/:components_id")
//     .all((req, res, next) => {
//       Components1Service.getById(req.app.get("db"), req.params.components_id)
//         .then((components) => {
//           if (!components) {
//             return res.status(404).json({
//               error: { message: `Component doesn't exist` },
//             });
//           }
//           res.components = components;
//           next();
//         })
//         .catch(next);
//     })
//     .get((req, res, next) => {
//       res.json(serializeComponents(res.components));
//     })
//     .delete((req, res, next) => {
//       Components1Service.deleteComponent(req.app.get("db"), req.params.components_id)
//         .then((numRowsAffected) => {
//           res.status(204).end();
//         })
//         .catch(next);
//     })
//     .patch(jsonParser, (req, res, next) => {
//       const { title, content, style } = req.body;
//       const componentsToUpdate = { title, content, style };
  
//       const numberOfValues = Object.values(componentsToUpdate).filter(Boolean)
//         .length;
//       if (numberOfValues === 0)
//         return res.status(400).json({
//           error: {
//             message: `Request body must content either 'title', 'style' or 'content'`,
//           },
//         });
  
//       Components1Service.updateComponent(
//         req.app.get("db"),
//         req.params.components_id,
//         componentsToUpdate
//       )
//         .then((numRowsAffected) => {
//           res.status(204).end();
//         })
//         .catch(next);
//     });
  
  module.exports = expenseRouter;