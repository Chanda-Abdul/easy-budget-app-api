//handles any operations related to database
//handling promises

const ExpenseService = {
  getAllExpenses(
    knex
    //   req, res
  ) {
    return knex.select("*").from("budget_expenses");
    const db = req.app.get("db");
    // console.log("db", db);
    /* insert code here*/
    return db
      .select("*")
      .from("budget_expenses")
      .then((expenses) =>
        res.json({
          expenses,
        })
      )
      .catch((err) =>
        res.json({
          err,
        })
      );
  },
  insertExpense(knex, newExpense) {
    return knex
      .insert(newExpense)
      .into("budget_expenses")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex.from("budget_expense").select("*").where("id", id).first();
  },
  deleteExpense(knex, id) {
    return knex("budget_expenses").where({ id }).delete();
  },
  updateExpense(knex, id, newExpenseFields) {
    return knex("budget_expenses")
    .where({ id })
    .update(newExpenseFields);
  },
};

module.exports = ExpenseService;
