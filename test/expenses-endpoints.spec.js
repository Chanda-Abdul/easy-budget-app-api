const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeExpensesArray } = require("./expenses.fixtures.js");

describe("Expenses Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("budget_expenses").truncate());

  afterEach("cleanup", () => db("budget_expenses").truncate());

  describe(`GET /api/expenses`, () => {
    context(`Given no expenses`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/expenses").expect(200, []);
      });
    });
});

describe(`GET /api/expenses/:id`, () => {
    context(`Given no expenses`, () => {
        it(`responds with 404`, () => {
            const expenseId = 123456
            return supertest(app)
            .get(`/api/expenses/${id}`)
            .expect(404, { message: `Expense doesn't exist` } })
    })
})

    context("Given there are expenses in the database", () => {
      //insert code here

      const testExpenses = makeExpensesArray();

      beforeEach("insert expense", () => {
        return db.into("budget_expenses").insert(testExpenses);
      });

      it("GET /api/expenses responds with 200 and all of the expenses", () => {
        return supertest(app).get("/api/expenses").expect(200, testExpenses);
        //TODO: add more assertions about the body
      });

      it("GET /api/expense/:id responds with 200 and the specified expense", () => {
        const expenseId = 2;
        const expectedExpenses = testExpenses[expenseId - 1];
        return supertest(app)
          .get(`/api/expenses/${expenseId}`)
          .expect(200, expectedExpenses);
      });
    });



  describe.only(`POST /api/expenses`, () => {
      it(`creates an expense, responding with 201 and the new expense`, function() {
        this.retries(3)
        const newExpense = {
            name: 'posting an expense again',
            amount: '15.00',
            type_id: '14',
            category: 'Recurring'
        }  
        return supertest(app)
          .post('/api/expenses')
          .send(newExpense)
          .expect(201).expect(res => {
            expect(res.body.name).to.eql(newExpense.name)
            expect(res.body.amount).to.eql(newExpense.amount)
            expect(res.body.type_id).to.eql(newExpense.type_id)
            expect(res.body.category).to.eql(newExpense.category)
            expect(res.body).to.have.property('id')
            expect(res.headers.location).to.eql(`/api/expenses/${res.body.id}`)
            const expected = new Date().toLocaleString('en', { timeZone: 'UTC' })
            const actual = new Date(res.body.date).toLocaleString()
            expect(actual).to.eql(expected)
            }).then(postRes =>
                supertest(app)
                .get(`/api/expenses/${postRes.body.id}`)
                .expect(postRes.body)
                )
      })
  
  const requireFields = ['name', 'amount']

  requiredFields.forEach(field => {
    const newExpense = {
      name: " test new expense",
      amount: '1000.00'
    }
    it(`responds with 400 and an error message when the '${field}' is missing`, () => {
      delete newExpense[field]

      return supertest(app).post('/api/expenses').send(newExpense).expect(400, {
        error: { message: `Missing '${field}' in request body` }
      })
    })
  })
  
    })
 describe.only(`DELETE /api/expenses/:expense_id`, () => {
   context(`Given no expenses`, () => {
     it(`responds with 404`, () => {
       const expenseId = 123456
       return supertest(app)
       .delete(`/api/expenses/${expenseId}`)
       .expect(404, { error: { message: `Article doesn't exist` } })
     })
   })
   context('Given there are expenses in the database', () => {
     const testExpenses = makeExpensesArray()

     beforeEach('insert expenses', () => {
       return db.into('budget_expenses').insert(testExpenses)
     })

     it('responds with 204 and removes the expense', () => {
       const idToRemove = 2
       const expectedExpenses = testExpenses.filter(expense => expense.id !== idToRemove)
       return supertest(app)
       .delete(`/api/expenses/${idToRemove}`)
       .expect(204)
       .then(res =>
        supertest(app)
          .get(`/api/expenses`)
          .expect(expectedExpenses)
        )
     })
   })
 })

 describe.only(`PATCH /api/expense/:expense_id`, () => {
   context(`Given no expenses`, () => {
     it(`responds with 404`, () => {
       const expenseId = 123456
       return supertest(app).patch(`/api/expenses/${expenseId}`).expect(404, { error: { message: `Expense doesn't exists` } })
     })
   })

   context('Given there are articles in the database', ()=> {
     const testExpenses = makeExpensesArray()

     beforeEach('insert article', () => {
       return db.into('blogful_articles').insert(testExpenses)
     })

     it('responds with 204 and updates the article', () => {
       const idToUpdate = 2
       const updateExpense = {
         name: 'updated expense name',
         amount: '1234.00',
         type_id: '12',
         category: 'Savings/Investments'
       }
       const expectedExpense = {
         ...testExpenses[idToUpdate -1],
         ...updateExpense
       }
       return supertest(app)
       .patch(`/api/articles/${idToUpdate}`)
       .send(updateExpense)
       .expect(204)
       .then(res => supertest(app)
       .get(`/api/expense/${idToUpdate}`)
       .expect(expectedExpenses)
       )
     })
     it(`responds with 400 when no require fields supplied`, () => {
       const idToUpdate = 2
       return supertest(app).patch(`/api/expenses/${idToUpdate}`).send({ irrelevantField: 'foo' }).expect(400, {
         error: {
           message: `Request body must contain either 'title', 'style' or 'content'`
         }
       })
     })
     it(`responds with 204 when updating only a subset of fields`, () => {
       const idToUpdate = 2
       const updateExpense = {
         name: 'updated expense name',
       }
       const expectedExpense = {
         ...testExpenses[idToUpdate -1],
         ...updateExpense
       }
       return supertest(app).patch(`/api/expenses/${idToUpdate}`).send({
         ...updateExpense,
         fieldToIgnore: 'should not be in GET response'
       })
       .expect(204).then(res => 
       supertest(app)
       .get(`/api/expenses/${idToUpdate}`)
       .expect(expectedExpense)
       )
     })
   })
   
 })

});
