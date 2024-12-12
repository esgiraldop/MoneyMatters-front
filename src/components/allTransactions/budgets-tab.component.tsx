import { View } from "react-native";
import { TabHeader } from "./tab-header.component";
import { useNavigation } from "@react-navigation/native";
import { AllTransactionsScreenNavigationProp } from "../../screens/all-transactions.screen";
import { tabStyles } from "./transactions-tab.component";

export const BudgetsTab = () => {
  const navigation = useNavigation<AllTransactionsScreenNavigationProp>();

  return (
    <View style={tabStyles.headerTabBar}>
      <TabHeader
        plusIconButtonAction={() => navigation.navigate("CreateBudget")}
      >
        Your budgets
      </TabHeader>
      {/* Add your budget list layout here */}
    </View>
  );
};
