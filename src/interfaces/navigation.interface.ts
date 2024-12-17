import { ParamListBase } from "@react-navigation/native";

export interface RootStackParamList extends ParamListBase {
  // Public screens
  Register: undefined;
  Login?: { setIsAuthenticated: (isAuthenticated: boolean) => void };
  RecoverPassword: undefined;
  // Priavate screens
  Transactions: undefined;
  TransactionDetails: { transactionId: string };
  TransactionsSummary: undefined;
  CreateTransaction: { parentBudgetId: string | undefined };
  EditTransaction: { transactionId: string };
  CreateBudget: { parentBudgetId: string | undefined };
  BudgetDetails: { budgetId: string };
  EditBudget: { budgetId: string };
}
