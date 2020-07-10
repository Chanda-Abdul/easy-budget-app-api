CREATE TYPE budget_category AS ENUM (
   'Recurring',
   'Savings/Investments', 
   'Discretionary'
);

CREATE TABLE budget_expenses (
    id serial PRIMARY KEY,
    name TEXT NOT NULL,
    amount MONEY NOT NULL,
    type_id INTEGER REFERENCES expense_type(id),
    category budget_category,
    date TIMESTAMPTZ DEFAULT now() NOT NULL
);





