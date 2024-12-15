import { useCallback, useState } from "react";
import { IBudget } from "../interfaces/budget.interface";
import { useFocusEffect } from "@react-navigation/native";
import { BudgetsService } from "../services/budgets.service";
import { getParentBudget } from "../screens/get-parent-budget.screen";

export function useBudgets() {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [parentBudget, setParentBudget] = useState<IBudget | null>(null);
  const [filteredBudgets, setFilteredBudgets] = useState<IBudget[]>([]);
  const [errorLoadingBudgets, setErrorLoadingBudgets] = useState<
    boolean | null
  >(null);
  const [isBudgetLoading, setIsBudgetLoading] = useState<boolean | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function getBudgetsInfo() {
        setIsBudgetLoading(true);
        const params: Record<string, string> = {};
        const BudgetsResponse = await BudgetsService.getAll(params);
        if (BudgetsResponse?.data) {
          setBudgets(BudgetsResponse?.data);
          setFilteredBudgets(BudgetsResponse?.data); //TODO: This should change when Im implementing the filtering
          setParentBudget(getParentBudget(BudgetsResponse?.data));
          setIsBudgetLoading(false);
          setErrorLoadingBudgets(false);
        } else {
          setIsBudgetLoading(false);
          setErrorLoadingBudgets(true);
        }
      }

      getBudgetsInfo();
      return () => getBudgetsInfo();
    }, [])
  );

  return {
    budgets,
    setBudgets,
    parentBudget,
    setParentBudget,
    filteredBudgets, //TODO: Give it a use to this
    setFilteredBudgets, //TODO: Give it a use to this
    errorLoadingBudgets,
    setErrorLoadingBudgets,
    isBudgetLoading,
    setIsBudgetLoading,
  };
}
