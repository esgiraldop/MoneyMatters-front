
/*CREATING A PARENT BUDGET */
/*
INSERT INTO budgets (budget_id, name, amount, "startDate", "endDate", "isGeneral", user_id, category_id, "isDeleted")
VALUES (null, 'parent budget', 0, '2024-12-01', '2024-12-01', true, 5, 10, false);
*/

/*CREATING A CHILD BUDGET */
/*
INSERT INTO budgets (budget_id, name, amount, "startDate", "endDate", "isGeneral", user_id, category_id, "isDeleted")
VALUES (3, 'child budget', 100, '2024-12-01', '2024-12-01', false, 5, 1, false);
*/

/* UPDATING A VALUE */
/*
UPDATE budgets SET "isDeleted" = false WHERE id > 20;

UPDATE transactions SET "isActive" = true WHERE id > 0;
*/
SELECT * FROM budgets;

