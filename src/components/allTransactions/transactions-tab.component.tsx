import { SectionList, StyleSheet, View } from "react-native";
import { containerStyles, textStyles } from "../../styles";
import { theme } from "../../theme/main.theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AllTransactionsScreenNavigationProp } from "../../screens/all-transactions.screen";
import { useCallback, useState } from "react";
import { TabHeader } from "./tab-header.component";
import { GoToTransactionDetailsButton } from "./go-to-transac-details-button.component";
import { Text } from "react-native-elements";
import { ITransaction } from "../../interfaces/transaction.interface";
import { groupBy } from "lodash";
import { transactionData } from "../../server/dummy-transactions";

export const TransactionsTab = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);

  const navigation = useNavigation<AllTransactionsScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      setTransactions(transactionData);
      setFilteredTransactions(transactionData);
    }, [])
  );

  const groupedTransactionsByDate = useCallback(() => {
    const grouped = groupBy(filteredTransactions, (transaction) =>
      new Date(transaction.transactionDate).toDateString()
    );

    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime()) // Sort by date
      .map(([date, contactsInfo]) => ({
        title: date,
        data: contactsInfo,
      }));
  }, [filteredTransactions]);

  return (
    <View style={[tabStyles.headerTabBar]}>
      <TabHeader
        plusIconButtonAction={() => navigation.navigate("CreateTransaction")}
      >
        Your expenses
      </TabHeader>
      <SectionList
        sections={groupedTransactionsByDate()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoToTransactionDetailsButton transactionData={item} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={textStyles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

export const tabStyles = StyleSheet.create({
  headerTabBar: {
    ...containerStyles.paddedContainerLightBc,
    padding: theme.spacing.small,
    flex: 1,
  },
});
