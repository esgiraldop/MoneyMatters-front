import { IBudget } from "../interfaces/budget.interface";
import { isNull } from "../utilities/checkIsNull.utility";

export function getParentBudget(budgets: IBudget[]): IBudget {
  return budgets.filter((budget) => isNull(budget.budget_id))[0];
}

export function getChildrenBudgets(budgets: IBudget[] | null): IBudget[] {
  return budgets ? budgets.filter((budget) => !isNull(budget.budget_id)) : [];
}
