import { SectionList, StyleSheet, View } from "react-native";
import { containerStyles, textStyles } from "../../styles";
import { theme } from "../../theme/main.theme";
import { useNavigation } from "@react-navigation/native";
import {
  AllTransactionsScreenNavigationProp,
  BudgetContext,
  IBudgetContext,
} from "../../screens/all-transactions.screen";
import { useCallback, useContext, useState } from "react";
import { TabHeader } from "./tab-header.component";
import { GoToTransactionDetailsButton } from "./go-to-transac-details-button.component";
import { Text } from "react-native-elements";
import { groupBy } from "lodash";
import { useTransactions } from "../../hooks/use-transactions.hook";
import { Loader } from "../common";

export const TransactionsTab = () => {
  const {
    transactions,
    setTransactions,
    filteredTransactions,
    setFilteredTransactions,
    errorLoadingTransactions,
    setErrorLoadingTransactions,
    isLoadingTransaction,
    setIsLoadingTransaction,
  } = useTransactions();

  const {
    filteredBudgets,
    setFilteredBudgets,
    errorLoadingBudgets,
    isBudgetLoading,
  } = useContext<IBudgetContext>(BudgetContext);

  const [isSearchModalVisible, setSearchModalVisible] =
    useState<boolean>(false);

  const toggleSearchModal = () => {
    setSearchModalVisible(!isSearchModalVisible);
  };

  const navigation = useNavigation<AllTransactionsScreenNavigationProp>();

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
        searchIconButtonAction={toggleSearchModal}
        isSearchModalVisible={isSearchModalVisible}
      >
        Your expenses
      </TabHeader>
      {isLoadingTransaction ? (
        <Loader />
      ) : errorLoadingTransactions ? (
        <Text style={textStyles.textError}>Error loading transactions</Text>
      ) : transactions && transactions.length < 1 ? (
        <View style={[containerStyles.centeredContainerLightBc, { flex: 1 }]}>
          <Text style={[textStyles.textH3, textStyles.textSecondary]}>
            Please add a transaction to start.
          </Text>
        </View>
      ) : filteredTransactions && filteredTransactions.length < 1 ? (
        <View style={[containerStyles.centeredContainerLightBc, { flex: 1 }]}>
          <Text style={[textStyles.textH3, textStyles.textSecondary]}>
            No transactions could be found.
          </Text>
        </View>
      ) : (
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
      )}
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
