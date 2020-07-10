function makeExpensesArray() {
  return [
    {
      name: "first expense",
      amount: "100.00",
      type_id: "14",
      category: "Recurring"
    },
      {
        name: "expense 2",
        amount: "20.00",
        type_id: "13",
        category: "Discretionary"
      },
      {
        name: "expense 3",
        amount: "30.00",
        type_id: "5",
        category: "Savings/Investments"
      },
      {
        name: "fourth expense",
        amount: "10.00",
        type_id: "12",
        category: "Recurring"
      },
  ];
}

module.exports = {
    makeExpensesArray,
}
