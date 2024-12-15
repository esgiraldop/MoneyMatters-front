import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-elements";
import { containerStyles } from "../styles/container.styles";
import { textStyles } from "../styles/text.styles";
import { TabView, SceneMap } from "react-native-tab-view";
import { BudgetsTab } from "../components/allTransactions/budgets-tab.component";
import { TransactionsTab } from "../components/allTransactions/transactions-tab.component";
import { TransactionsTabBar } from "../components/allTransactions/transactions-tab-bar.component";
import { getCurrentDate } from "../utilities/dates.utility";
import { RootStackParamList } from "../interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useBudgets } from "../hooks/use-budgets.hook";
import { Loader } from "../components";
import { formatPrice } from "../utilities/format-price.utility";

export type AllTransactionsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllTransactions"
>;

export const AllTransactionsScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "transactions", title: "Expenses" },
    { key: "budgets", title: "Budgets" },
  ]);

  const renderScene = SceneMap({
    transactions: TransactionsTab,
    budgets: BudgetsTab,
  });

  const {
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
  } = useBudgets();

  return (
    <View
      style={[
        containerStyles.containerLightBc,
        containerStyles.resetWidthContainer,
      ]}
    >
      {isBudgetLoading ? (
        <Loader />
      ) : errorLoadingBudgets ? (
        <Text style={textStyles.textError}>
          Error loading budgets and transactions
        </Text>
      ) : (
        <View style={[containerStyles.paddedContainerLightBc]}>
          {budgets.length < 1 ? (
            <>
              <Text style={[textStyles.textH3, textStyles.textSecondary]}>
                No budgets could be found.
              </Text>
              <Text style={[textStyles.textBody2]}>
                Please create a budget and some transactions to see them
                reflected here
              </Text>
            </>
          ) : (
            <>
              {!parentBudget ? (
                <Text style={[textStyles.textH3, textStyles.textSecondary]}>
                  No parent budget found
                </Text>
              ) : (
                <>
                  <Text style={[textStyles.textH3, textStyles.textSecondary]}>
                    Your budget:{" "}
                    {parentBudget.amount
                      ? formatPrice(parentBudget.amount)
                      : "No budget amound found"}
                  </Text>
                  <Text style={[textStyles.textH3, textStyles.textSecondary]}>
                    Your expenses:{" "}
                    {parentBudget.transactionsSum
                      ? formatPrice(parentBudget.transactionsSum)
                      : "No transactions sum could be calculated"}
                  </Text>
                  <Text style={textStyles.textBody2}>
                    You have spent{" "}
                    {Math.round(
                      (parentBudget.transactionsSum / parentBudget.amount) * 100
                    )}
                    % of your budget this month
                  </Text>
                  <Text style={textStyles.textBody2}>{getCurrentDate()}</Text>
                </>
              )}
            </>
          )}
        </View>
      )}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{
          width: Dimensions.get("window").width,
        }}
        renderTabBar={TransactionsTabBar}
      />
    </View>
  );
};
