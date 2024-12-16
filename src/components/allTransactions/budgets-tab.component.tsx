import { SectionList, View } from "react-native";
import { TabHeader } from "./tab-header.component";
import { useNavigation } from "@react-navigation/native";
import {
  AllTransactionsScreenNavigationProp,
  BudgetContext,
  IBudgetContext,
} from "../../screens/all-transactions.screen";
import { tabStyles } from "./transactions-tab.component";
import { useCallback, useContext, useEffect, useState } from "react";
import { groupBy } from "lodash";
import { GoToBudgetDetailsButton } from "./go-to-budget-details-button.component";
import { Text } from "react-native-elements";
import { containerStyles, textStyles } from "../../styles";
import { getCurrentDate } from "../../utilities/dates.utility";
import { ConfirmationModal, Loader } from "../common";
import { getChildrenBudgets } from "../../screens/get-parent-budget.screen";
import { SearchBarModal } from "./search-bar-modal-component";

export const BudgetsTab = () => {
  const {
    budgets,
    setBudgets,
    filteredBudgets,
    setFilteredBudgets,
    errorLoadingBudgets,
    isBudgetLoading,
  } = useContext<IBudgetContext>(BudgetContext);

  const [isSearchModalVisible, setSearchModalVisible] =
    useState<boolean>(false);

  const [isSearchTransacWarningModalOpen, setIsSearchTransacWarningModalOpen] =
    useState<boolean>(false);

  const toggleSearchModal = () => {
    if (!budgets || budgets.length < 1) {
      setIsSearchTransacWarningModalOpen(!isSearchTransacWarningModalOpen);
    } else {
      setSearchModalVisible(!isSearchModalVisible);
    }
  };

  const navigation = useNavigation<AllTransactionsScreenNavigationProp>();

  const groupedBudgetsByDate = useCallback(() => {
    const grouped = groupBy(
      getChildrenBudgets(filteredBudgets), //Getting rid of parent budget
      (budget) => new Date(budget.startDate).toDateString()
    );

    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime()) // Sort by date
      .map(([date, budgetsInfo]) => {
        // Getting current budget month and year
        const splitDate = date.split(" ");
        const year = splitDate[splitDate.length - 1];
        const month = splitDate[1];

        // Getting current month and year
        const currentDate = getCurrentDate().split(" ");
        const currentYear = currentDate[currentDate.length - 1];
        const currentMonth = currentDate[0].slice(0, 3);

        if (year === currentYear) {
          if (month === currentMonth) {
            return {
              title: "This month",
              data: budgetsInfo,
            };
          }
          return {
            title: month,
            data: budgetsInfo,
          };
        }

        return {
          title: `${month}, ${year}`,
          data: budgetsInfo,
        };
      });
  }, [filteredBudgets]);

  return (
    <View style={tabStyles.headerTabBar}>
      <TabHeader
        plusIconButtonAction={() => navigation.navigate("CreateBudget")}
        searchIconButtonAction={toggleSearchModal}
      >
        Your budgets
      </TabHeader>
      {isBudgetLoading ? (
        <Loader />
      ) : errorLoadingBudgets ? (
        <Text style={textStyles.textError}>Error loading budgets</Text>
      ) : budgets && budgets.length < 1 ? (
        <View style={[containerStyles.centeredContainerLightBc, { flex: 1 }]}>
          <Text style={[textStyles.textH3, textStyles.textSecondary]}>
            Please add a budget to start.
          </Text>
        </View>
      ) : filteredBudgets && filteredBudgets.length < 1 ? (
        <View style={[containerStyles.centeredContainerLightBc, { flex: 1 }]}>
          <Text style={[textStyles.textH3, textStyles.textSecondary]}>
            No budgets could be found.
          </Text>
        </View>
      ) : (
        <SectionList
          sections={groupedBudgetsByDate()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GoToBudgetDetailsButton budgetData={item} />
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
        confirmationModalVisible={isSearchTransacWarningModalOpen}
        setConfirmationModalVisible={setIsSearchTransacWarningModalOpen}
        handleAccept={() =>
          setIsSearchTransacWarningModalOpen(!isSearchTransacWarningModalOpen)
        }
      >
        Please create some budgets first in order to be able to search them by
        name
      </ConfirmationModal>
    </View>
  );
};
