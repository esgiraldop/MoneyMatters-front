import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../interfaces";
import { isNull } from "lodash";
import { theme } from "../../theme/main.theme";
import { RegistrationScreen } from "../../screens/register.screen";
import LoginScreen from "../../screens/login.screen";
import { RecoverPasswordScreen } from "../../screens/recover-password.screen";
import { AllTransactionsScreen } from "../../screens/all-transactions.screen";
import { TransactionDetailsScreen } from "../../screens/transaction-details.screen";
import { TransactionsSummaryScreen } from "../../screens/transactions-summary.screen";
import { CreateTransactionScreen } from "../../screens/create-transaction.screen";
import { EditTransactionScreen } from "../../screens/edit-transaction.screen";
import { CreateBudgetScreen } from "../../screens/create-budget.screen";
import { BudgetDetailsScreen } from "../../screens/budget-details.screen";
import { EditBudgetScreen } from "../../screens/edit-budget.screen";

interface IStackNavigator {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const StackNavigator = ({
  isAuthenticated,
  setIsAuthenticated,
}: IStackNavigator) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName={
        !isAuthenticated && isNull(isAuthenticated)
          ? "Register"
          : "Transactions"
        // "CreateBudget"
      }
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          fontSize: theme.typography.h2.fontSize,
          color: theme.colors.textPrimary,
        },
        animation: "slide_from_right",
        freezeOnBlur: true,
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{ title: "User registration" }}
          />
          <Stack.Screen name="Login" options={{ title: "User login" }}>
            {(props) => (
              <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="RecoverPassword"
            component={RecoverPasswordScreen}
            options={{ title: "Recover Password" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Transactions"
            component={AllTransactionsScreen}
            options={{
              title: "All transactions",
            }}
          />
          <Stack.Screen
            name="TransactionDetails"
            component={TransactionDetailsScreen}
            options={{
              title: "Transaction details",
            }}
          />
          <Stack.Screen
            name="TransactionsSummary"
            component={TransactionsSummaryScreen}
            options={{
              title: "Transactions summary",
            }}
          />
          <Stack.Screen
            name="CreateTransaction"
            component={CreateTransactionScreen}
            options={{
              title: "Create new transaction",
            }}
          />
          <Stack.Screen
            name="EditTransaction"
            component={EditTransactionScreen}
            options={{
              title: "Edit transaction",
            }}
          />
          <Stack.Screen
            name="CreateBudget"
            component={CreateBudgetScreen}
            options={{
              title: "Create a new budget",
            }}
          />
          <Stack.Screen
            name="BudgetDetails"
            component={BudgetDetailsScreen}
            options={{
              title: "Budget details",
            }}
          />
          <Stack.Screen
            name="EditBudget"
            component={EditBudgetScreen}
            options={{
              title: "Edit budget",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
