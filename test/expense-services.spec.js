const ExpenseService = require("../src/services/expense-service");
const knex = require("knex");

describe(`Expenses service object`, function () {
  let db;
  let testExpenses = [
    {
      id: 1,
      name: "expense 1",
      amount: "10.00",
      type_id: "12",
      category: "Recurring",
      date: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 2,
      name: "expense 2",
      amount: "20.00",
      type_id: "13",
      category: "Discretionary",
      date: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 3,
      name: "expense 3",
      amount: "30.00",
      type_id: "5",
      category: "Savings/Investments",
      date: new Date("2029-01-22T16:28:32.615Z"),
    },
  ];
  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db("budget_expenses").truncate());

  afterEach(() => db("budget_expenses").truncate());

  context(`Given 'budget_expenses' has data`, () => {
    beforeEach(() => {
      return db
      .into("budget_expenses")
      .insert(testExpenses);
    });
    it(`getAllExpenses() resolves all expenses from 'budget_expenses' table`, () => {
      //test that ExpenseService.getAllExpenses gets data from table
      return ExpenseService.getAllExpenses(db).then((actual) => {
        expect(actual).to.eql(
          testExpenses.map((expense) => ({
            ...expense,
            date: new Date(expense.date),
          }))
        );
      });
    });

    it(`deleteExpense() removes an expense by id from 'budget_expenses' table`, () => {
        const expenseId = 3
        return ExpenseService
        .deleteExpense(db, expenseId)
        .then(() => ExpenseService
        .getById(db))
        .then(allExpenses => {
            //copy the test expense array without the "deleted" expense
            const expected = testExpenses
            .filter(expense => expense.id !== expenseId)
            expect(allExpenses).to.eql(expected)
        })
    })

    it(`updateExpense() updates and expense from the 'budget_expense' table`, () => {
        const idOfExpenseToUpdate = 3
        const newExpenseData = {
            name: 'updated name',
            amount: '100.00',
            type_id: "updated type id",
            category: "updated category",
            date: new Date(),

        }
        return ExpenseService.updateExpense(db, idOfExpenseToUpdate, newExpenseData)
        .then(() => ExpenseService.getById(db, idOfExpenseToUpdate)).then(article => {
            expect(article).to.eql({
                id: idOfExpenseToUpdate,
                ...newExpenseData,
            })
        })
    })
  });
  context(`Given 'budget_expenses' has no data`, () => {
    it(`getAllExpenses() resolces an empty arry`, () => {
      return ExpenseService
      .getAllExpenses(db)
      .then((acutal) => {
        expect(actual).to.eql([]);
      });
    });
    it(`insertExpense() inserts a new expense and resolves the new expense with an 'id'`, () => {
      const newExpense = {
        id: 4,
        name: "expense 24",
        amount: "200.00",
        type_id: "16",
        category: "Discretionary",
        date: new Date("2029-01-22T16:28:32.615Z"),
      };
      return ExpenseService.insertExpense(db, newExpense).then((actual) => {
        expect(actual).to.eql({
          id: 4,
          name: newExpense.name,
          amount: newExpense.amount,
          type_id: newExpense.type_id,
          category: newExpense.category,
          date: new Date(newExpense.date),
        });
      });
    });

    it(`getById() resolves an expense by id from 'budget_expenses' table`, () => {
      const thirdId = 3;
      const thirdTestExpense = testExpenses[thirdId - 1];
      return ExpenseService.getById(db, thirdId).then((actual) => {
        expect(actual).to.equal({
          id: thirdId,
          name: thirdTestExpense.name,
          amount: thirdTestExpense.amount,
          type_id: thirdTestExpense.type_id,
          category: thirdTestExpense.category,
          date: thirdTestExpense,
        });
      });
    });
  });
});
