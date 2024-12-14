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

export type TbudgetData = Omit<IBudget, "isDeleted" | "isGeneral">;

export interface IBudgetData {
  budgetData: TbudgetData;
}

export function GoToBudgetDetailsButton({ budgetData }: IBudgetData) {
  const { name, id, amount, budget_id, startDate, endDate } = budgetData;

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
      <View style={styles.textBox}>
        <Text style={textStyles.textH3Dark}>(Barchart here)</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textBox: { flex: 1 },
});
