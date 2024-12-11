import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-elements";
import { containerStyles } from "../styles/container.styles";
import { textStyles } from "../styles/text.styles";
import { theme } from "../theme/main.theme";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const initialLayout = { width: Dimensions.get("window").width };

const TransactionsScreen = () => (
  <View style={[containerStyles.paddedContainerLightBc, { flex: 1 }]}>
    <Text style={textStyles.textBody2}>
      Your transactions history this month
    </Text>
    {/* Add your transactions list layout here */}
  </View>
);

const BudgetsScreen = () => (
  <View style={[containerStyles.paddedContainerLightBc, { flex: 1 }]}>
    <Text style={textStyles.textBody2}>Your budgets this month</Text>
    {/* Add your budget list layout here */}
  </View>
);

export const AllTransactionsScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "transactions", title: "Transactions" },
    { key: "budgets", title: "Budgets" },
  ]);

  const renderScene = SceneMap({
    transactions: TransactionsScreen,
    budgets: BudgetsScreen,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: theme.colors.accent,
        height: 3,
      }}
      style={{
        backgroundColor: theme.colors.backgroundLighter,
      }}
      labelStyle={textStyles.textBody2}
    />
  );

  return (
    <View
      style={[
        containerStyles.containerLightBc,
        { width: Dimensions.get("window").width },
      ]}
    >
      <View
        style={[
          containerStyles.paddedContainerLightBc,
          { borderBottomWidth: 1, borderBottomColor: theme.colors.borderColor },
        ]}
      >
        <Text style={textStyles.textH2}>
          Remaining budget this month: $50.000
        </Text>
        <Text style={textStyles.textBody2}>
          You have spent a total of 40% of your budget this month
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          width: Dimensions.get("window").width,
          margin: 0,
          padding: 0,
          borderColor: "red",
          borderWidth: 2,
        }}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{
            width: Dimensions.get("window").width,
          }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};
