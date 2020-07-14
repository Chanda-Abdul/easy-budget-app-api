TRUNCATE table "budget_expenses";

INSERT INTO budget_expenses (name, amount, type_id, category)
VALUES
  ('Rent', 1200.00 , 1, 'Recurring'),
  ('PG&E', 50.00 , 2, 'Recurring'),
  ('Gas', 25.00 , 3, 'Recurring'),
  ('AT&T', 50.00 , 4, 'Recurring'),
  ('Verizon', 50.00 , 5, 'Recurring'),
  ('Waterworks', 25.00 , 6, 'Recurring'),
  ('Savings', 400.00 , 7, 'Savings/Investments'),
  ('Car Payment', 475.00 , 10, 'Discretionary'),
  ('Shell Gas', 75.00 , 10, 'Discretionary'),
  ('West Elm', 2475.00 , 15, 'Discretionary'),
  ('Trader Joes', 275.00 , 12, 'Discretionary'),
  ('Eat Inn', 175.00 , 11, 'Discretionary'),
  ('Amazon', 675.00 , 14, 'Discretionary'),
  ('Lemonade Renters Insurance', 22.00 , 21, 'Discretionary'),
  ('Feed America', 400.00 , 17, 'Discretionary');
