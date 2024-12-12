import { StyleSheet, View } from "react-native";
import { containerStyles } from "../../styles";
import { theme } from "../../theme/main.theme";
import { useNavigation } from "@react-navigation/native";
import { AllTransactionsScreenNavigationProp } from "../../screens/all-transactions.screen";
import { useState } from "react";
import { TabHeader } from "./tab-header.component";

export const TransactionsTab = () => {
  const navigation = useNavigation<AllTransactionsScreenNavigationProp>();

  return (
    <View style={tabStyles.headerTabBar}>
      <TabHeader
        plusIconButtonAction={() => navigation.navigate("CreateTransaction")}
      >
        Your expenses
      </TabHeader>
      {/* Add your budget list layout here */}
    </View>
  );
};

export const tabStyles = StyleSheet.create({
  headerTabBar: {
    ...containerStyles.paddedContainerLightBc,
    padding: theme.spacing.small,
  },
});
