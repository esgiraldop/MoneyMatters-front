import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../interfaces";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-elements";
import { IBudget } from "../../interfaces/budget.interface";
import { textStyles } from "../../styles/text.styles";
import { buttonStyle } from "../../styles/buttons.style";
import { formatPrice } from "../../utilities/format-price.utility";
import { trimText } from "../../utilities/trim-text.utility";
import { BarChart } from "react-native-gifted-charts";
import { theme } from "../../theme/main.theme";

export type TbudgetData = Omit<IBudget, "isDeleted" | "isGeneral">;

export interface IBudgetData {
  budgetData: TbudgetData;
}

export function GoToBudgetDetailsButton({ budgetData }: IBudgetData) {
  const { name, id, amount, transactionsSum } = budgetData;

  const stackData = [
    {
      stacks: [
        {
          value: Math.round((amount / (amount + transactionsSum)) * 100),
          color: theme.colors.error,
          marginBottom: 0,
          onPress: () => console.log("You pressed red"),
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        },
        {
          value: Math.round(
            (transactionsSum / (amount + transactionsSum)) * 100
          ),
          color: theme.colors.success,
          marginBottom: 0,
          onPress: () => console.log("You pressed green"),
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
      ],
    },
  ];

  type BudgetDetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "BudgetDetails"
  >;

  const navigation = useNavigation<BudgetDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={[buttonStyle.transactionDetailsButton]}
      onPress={() => navigation.navigate("BudgetDetails", { budgetId: id })}
    >
      <View style={styles.textBox}>
        <Text style={textStyles.textH3Dark}>{trimText(name)}</Text>
        <Text style={textStyles.textBody2}>
          <Text style={[textStyles.textBody2, textStyles.textBold]}>
            Planned:{" "}
          </Text>
          {formatPrice(amount)}
        </Text>
        <Text style={textStyles.textBody2}>
          <Text style={[textStyles.textBody2, textStyles.textBold]}>
            Spent:{" "}
          </Text>
          {formatPrice(amount)}{" "}
          {/*TODO: subtract transations in every budget's group*/}
        </Text>
      </View>
      <View
        style={[
          styles.textBox,
          {
            height: 100,
          },
        ]}
      >
        <Text style={textStyles.textBody2}>
          You have spent{" "}
          {Math.round((amount / (amount + transactionsSum)) * 100)}%
        </Text>
        <BarChart
          stackData={stackData}
          horizontal
          width={150}
          height={50}
          maxValue={100}
          barWidth={50}
          trimYAxisAtTop={true}
          spacing={10}
          hideAxesAndRules={true}
          hideOrigin={true}
          isAnimated
          shiftX={-60}
          shiftY={-30}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textBox: { flex: 1 },
});
