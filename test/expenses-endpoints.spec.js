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

  describe(`GET /expenses`, () => {
    context(`Given no expenses`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/expenses").expect(200, []);
      });
    });
});

describe(`GET /expenses/:id`, () => {
    context(`Given no expenses`, () => {
        it(`responds with 404`, () => {
            const expenseId = 123456
            return supertest(app)
            .get(`/expenses/${id}`)
            .expect(404, { message: `Expense doesn't exist` } })
    })
})

    context("Given there are expenses in the database", () => {
      //insert code here

      const testExpenses = makeExpensesArray();

      beforeEach("insert expense", () => {
        return db.into("budget_expenses").insert(testExpenses);
      });

      it("GET /expenses responds with 200 and all of the expenses", () => {
        return supertest(app).get("/expenses").expect(200, testExpenses);
        //TODO: add more assertions about the body
      });

      it("GET /expense/:id responds with 200 and the specified expense", () => {
        const expenseId = 2;
        const expectedExpense = testExpenses[expenseId - 1];
        return supertest(app)
          .get(`/expenses/${expenseId}`)
          .expect(200, expectedExpense);
      });
    });



  describe(`POST /expenses`, () => {
      it(`creates an expense, responding with 201 and the new expense`, function() {
        this.retries(3)
        const newExpense = {
            name: 'posting an expense again',
            amount: '15.00',
            type_id: '14',
            category: 'Recurring'
        }  
        return supertest(app)
          .post('/expenses')
          .send(newExpense)
          .expect(201).expect(res => {
            expect(res.body.name).to.eql(newExpense.name)
            expect(res.body.amount).to.eql(newExpense.amount)
            expect(res.body.type_id).to.eql(newExpense.type_id)
            expect(res.body.category).to.eql(newExpense.category)
            expect(res.body).to.have.property('id')
            expect(res.headers.location).to.eql(`/expenses/${res.body.id}`)
            const expected = new Date().toLocaleString('en', { timeZone: 'UTC' })
            const actual = new Date(res.body.date).toLocaleString()
            expect(actual).to.eql(expected)
            }).then(postRes =>
                supertest(app)
                .get(`/expense/${postRes.body.id}`)
                .expect(postRes.body)
                )
      })
  })

});
