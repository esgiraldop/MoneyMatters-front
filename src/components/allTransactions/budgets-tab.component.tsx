import { SectionList, View } from "react-native";
import { TabHeader } from "./tab-header.component";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  AllTransactionsScreenNavigationProp,
  BudgetContext,
  IBudgetContext,
} from "../../screens/all-transactions.screen";
import { tabStyles } from "./transactions-tab.component";
import { useCallback, useContext } from "react";
import { budgetData } from "../../server/dummy-budgets";
import { groupBy } from "lodash";
import { GoToBudgetDetailsButton } from "./go-to-budget-details-button.component";
import { Text } from "react-native-elements";
import { containerStyles, textStyles } from "../../styles";
import { getCurrentDate } from "../../utilities/dates.utility";
import { Loader } from "../common";

export const BudgetsTab = () => {
  const {
    filteredBudgets,
    setFilteredBudgets,
    errorLoadingBudgets,
    isBudgetLoading,
  } = useContext<IBudgetContext>(BudgetContext);

  const navigation = useNavigation<AllTransactionsScreenNavigationProp>();

  // useFocusEffect(
  //   useCallback(() => {
  //     setFilteredBudgets(budgetData);
  //   }, [filteredBudgets])
  // );

  const groupedBudgetsByDate = useCallback(() => {
    const grouped = groupBy(filteredBudgets, (budget) =>
      new Date(budget.startDate).toDateString()
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
      >
        Your budgets
      </TabHeader>
      {isBudgetLoading ? (
        <Loader />
      ) : errorLoadingBudgets ? (
        <Text style={textStyles.textError}>Error loading budgets</Text>
      ) : filteredBudgets && filteredBudgets.length < 1 ? (
        <View style={[containerStyles.centeredContainerLightBc, { flex: 1 }]}>
          <Text style={[textStyles.textH3, textStyles.textSecondary]}>
            Please add a budget to start.
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
    </View>
  );
};
