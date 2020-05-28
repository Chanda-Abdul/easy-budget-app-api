//handles any operations related to database
//handling promises

const ExpenseService = {
  getExpenses(knex) {
    return knex
    .select('*')
    .from("budget_expenses");
//
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
    return knex
    .from("budget_expenses")
    .select("*")
    .where("id", id)
    .first();
  },
  deleteExpense(knex, id) {
    return knex("budget_expenses")
    .where({ id })
    .delete();
  },
  getAllExpenses(knex, id) {
    //need to fix this
    return knex
      .from('budget_expenses')
      .select(
        'budget_expenses.id',
        'budget_expenses.name',
        'budget_expenses.amount',
        'budget_expenses.type_id', 
        'budget_expenses.date'
      )
      .where('expense_type.type', id)
      .innerJoin('expense_type', 'budget_expenses.type_id', 'expense_type.id')
      .groupBy('expense_type.id')
  },
  updateExpense(knex, id, newExpenseFields) {
    return knex
    .from("budget_expenses")
    .where({ id })
    .update(newExpenseFields);
  },
  
};

module.exports = ExpenseService;




