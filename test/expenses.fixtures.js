function makeExpensesArray() {
  return [
    {
      id: 1,
      name: "first expense",
      amount: "100.00",
      type_id: "14",
      category: "Recurring",
      date: "2029-01-22T16:28:32.615Z",
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
      {
        id: 4,
        name: "fourth expense",
        amount: "10.00",
        type_id: "12",
        category: "Recurring",
        date: new Date("2029-01-22T16:28:32.615Z"),
      },
  ];
}

module.exports = {
    makeExpensesArray,
}
