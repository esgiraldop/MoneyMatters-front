import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-elements";
import { containerStyles } from "../styles/container.styles";
import { textStyles } from "../styles/text.styles";
import { TabView, SceneMap } from "react-native-tab-view";
import { BudgetsTab } from "../components/allTransactions/budgets-tab.component";
import { TransactionsTab } from "../components/allTransactions/transactions-tab.component";
import { TransactionsTabBar } from "../components/allTransactions/transactions-tab-bar.component";
import { getCurrentDate } from "../utilities/dates.utility";

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

  return (
    <View
      style={[
        containerStyles.containerLightBc,
        containerStyles.resetWidthContainer,
      ]}
    >
      <View style={[containerStyles.paddedContainerLightBc]}>
        <Text style={[textStyles.textH3, textStyles.textSecondary]}>
          Your budget: $100.000
        </Text>
        <Text style={[textStyles.textH3, textStyles.textSecondary]}>
          Your expenses: $40.000
        </Text>
        <Text style={textStyles.textBody2}>
          You have spent 40% of your budget this month
        </Text>
        <Text style={textStyles.textBody2}>{getCurrentDate()}</Text>
      </View>
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
