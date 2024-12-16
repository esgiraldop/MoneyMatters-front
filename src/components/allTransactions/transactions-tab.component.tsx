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
import { ConfirmationModal, Loader } from "../common";
import { SearchBarModal } from "./search-bar-modal-component";

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
    budgets,
    setBudgets,
    filteredBudgets,
    setFilteredBudgets,
    errorLoadingBudgets,
    isBudgetLoading,
  } = useContext<IBudgetContext>(BudgetContext);

  const [isAddTransacWarningModalOpen, setIsAddTransacWarningModalOpen] =
    useState<boolean>(false);
  const [isSearchTransacWarningModalOpen, setIsSearchTransacWarningModalOpen] =
    useState<boolean>(false);

  const [isSearchModalVisible, setSearchModalVisible] =
    useState<boolean>(false);

  const toggleSearchModal = () => {
    if (!transactions || transactions.length < 1) {
      setIsSearchTransacWarningModalOpen(!isSearchTransacWarningModalOpen);
    } else {
      setSearchModalVisible(!isSearchModalVisible);
    }
  };

  const addTransactionAction = () => {
    if (!budgets || budgets.length < 1) {
      setIsAddTransacWarningModalOpen(!isAddTransacWarningModalOpen);
    } else {
      navigation.navigate("CreateTransaction");
    }
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
        plusIconButtonAction={addTransactionAction}
        searchIconButtonAction={toggleSearchModal}
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
      <SearchBarModal
        isSearchModalVisible={isSearchModalVisible}
        toggleSearchModal={toggleSearchModal}
      />
      <ConfirmationModal
        confirmationModalVisible={isAddTransacWarningModalOpen}
        setConfirmationModalVisible={setIsAddTransacWarningModalOpen}
        handleAccept={() =>
          setIsAddTransacWarningModalOpen(!isAddTransacWarningModalOpen)
        }
      >
        Please create a budget first for the current month to be able to create
        an expense
      </ConfirmationModal>
      <ConfirmationModal
        confirmationModalVisible={isSearchTransacWarningModalOpen}
        setConfirmationModalVisible={setIsSearchTransacWarningModalOpen}
        handleAccept={() =>
          setIsSearchTransacWarningModalOpen(!isSearchTransacWarningModalOpen)
        }
      >
        Please create some transactions first in order to be able to search them
        by name
      </ConfirmationModal>
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
