CREATE TABLE budget_expenses (
    id serial PRIMARY KEY,
    name TEXT NOT NULL,
    amount NUMERIC(10,2),
    type_id INTEGER REFERENCES expense_type(id),
    category budget_category,
    date TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TYPE budget_category AS ENUM (
   'Recurring',
   'Savings/Investments', 
   'Discretionary'
);



