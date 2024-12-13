import { SectionList, StyleSheet, View } from "react-native";
import { containerStyles, textStyles } from "../../styles";
import { theme } from "../../theme/main.theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AllTransactionsScreenNavigationProp } from "../../screens/all-transactions.screen";
import { useCallback, useState } from "react";
import { TabHeader } from "./tab-header.component";
import {
  GoToTransactionDetailsButton,
  ITransactionData,
  TtransactionData,
} from "./go-to-transac-details-button.component";
import { Text } from "react-native-elements";
import { ITransaction } from "../../interfaces/transaction.interface";
import { groupBy } from "lodash";

export const TransactionsTab = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);

  const navigation = useNavigation<AllTransactionsScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      const transactionData: ITransaction[] = [
        {
          id: "1",
          name: "Test #1",
          amount: 10000,
          transactionDate: new Date("2024-12-12"),
          category: {
            id: 1,
            name: "category test",
          },
        },
        {
          id: "2",
          name: "Test #2",
          amount: 11500,
          transactionDate: new Date("2024-12-12"),
          category: {
            id: 1,
            name: "category test",
          },
        },
        {
          id: "3",
          name: "Test # 3",
          amount: 150000,
          transactionDate: new Date("2024-12-10"),
          category: {
            id: 2,
            name: "cat test #2",
          },
        },
        {
          id: "4",
          name: "Test # 4",
          amount: 6700,
          transactionDate: new Date("2024-12-10"),
          category: {
            id: 2,
            name: "cat test #5",
          },
        },
        {
          id: "5",
          name: "Test # 5",
          amount: 6700,
          transactionDate: new Date("2024-12-10"),
          category: {
            id: 2,
            name: "cat test #5",
          },
        },
      ];

      setTransactions(transactionData);
      setFilteredTransactions(transactionData);
    }, [])
  );

  const groupedTransactionsByDate = useCallback(() => {
    const grouped = groupBy(filteredTransactions, (transaction) =>
      new Date(transaction.transactionDate).toDateString()
    );

    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime()) // Sort by date
      .map(([date, contactsInfo]) => ({
        title: date, // Use the date as the title
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
