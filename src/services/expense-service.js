const ExpenseService = {
  getExpenses(knex) {
    return knex
    .select('*')
    .from("budget_expenses");
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
    return knex
    .select(
          'budget_expenses.id',
          'budget_expenses.name',
          'budget_expenses.amount',
          'expense_type.type',
          'budget_expenses.category',
          'budget_expenses.date'
        )
    .from('budget_expenses')
    .innerJoin('expense_type', 'budget_expenses.type_id', 'expense_type.id')
  },
  updateExpense(knex, id, newExpenseFields) {
    return knex
    .from("budget_expenses")
    .where({ id })
    .update(newExpenseFields);
  },
  
};

module.exports = ExpenseService;




