const path = require("path");
const express = require("express");
// const ExpenseService = require('../services/expense-service');

const expenseRouter = require('express').Router();
const jsonParser = express.json();

function handleGetExpenses(req, res) {
  res.send('Hello, expenses coming right up!')
}

expenseRouter.get('/api/expenses', handleGetExpenses)

expenseRouter.post('/', (req, res) => {
  //add new expense to budget_expense table
  //how can I make this a function or an enpoint of /api/expenses
  res.send('POST Request received');
});

expenseRouter.delete('/', (req, res) => {
  //delete expenses from budget_expense table
  res.send('DELETE Request received');
});

expenseRouter.put('/', (req, res) => {
  //update budget_expense table with new expense
  res.send('PUT Request received');
});


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
//     .post(jsonParser, (req, res, next) => {
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