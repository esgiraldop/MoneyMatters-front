import { useState } from "react";
import { IBudget } from "../interfaces/budget.interface";

export function useBudgets() {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [filteredBudgets, setFilteredBudgets] = useState<IBudget[]>([]);
  const [errorLoadingBudgets, setErrorLoadingBudgets] = useState<
    boolean | null
  >(null);
  const [isLoadingBudget, setIsLoadingBudget] = useState<boolean | null>(null);

  return {
    budgets,
    setBudgets,
    filteredBudgets,
    setFilteredBudgets,
    errorLoadingBudgets,
    setErrorLoadingBudgets,
    isLoadingBudget,
    setIsLoadingBudget,
  };
}
