import { useCallback, useState } from "react";
import { ISingleBudgetSucessfullResponse } from "../interfaces/budget.interface";
import { BudgetsService } from "../services/budgets.service";
import { useFocusEffect } from "@react-navigation/native";

export function useBudgetById(budgetId: number) {
  const [budgetInfo, setBudgetInfo] =
    useState<ISingleBudgetSucessfullResponse | null>(null);
  const [isBudgetLoading, setIsBudgetLoading] = useState<boolean | null>(false);
  const [errorLoadingBudget, setErrorLoadingBudget] = useState<boolean | null>(
    null
  );

  useFocusEffect(
    useCallback(() => {
      async function getBudgetInfo(id: number) {
        setIsBudgetLoading(true);
        const budgetInfoResponse = await BudgetsService.getById(id);
        if (budgetInfoResponse) {
          setBudgetInfo(budgetInfoResponse);
          setIsBudgetLoading(false);
          setErrorLoadingBudget(false);
        } else {
          setIsBudgetLoading(false);
          setErrorLoadingBudget(true);
        }
      }

      getBudgetInfo(budgetId);
      return () => getBudgetInfo(budgetId);
    }, [budgetId])
  );

  return {
    budgetInfo,
    setBudgetInfo,
    isBudgetLoading,
    setIsBudgetLoading,
    errorLoadingBudget,
    setErrorLoadingBudget,
  };
}
