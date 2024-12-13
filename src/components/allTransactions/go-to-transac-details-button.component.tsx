import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../interfaces";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-elements";
import { ITransaction } from "../../interfaces/transaction.interface";
import { textStyles } from "../../styles/text.styles";
import { buttonStyle } from "../../styles/buttons.style";
import { formatDate } from "../../utilities/dates.utility";
import { formatPrice } from "../../utilities/format-price.utility";
import { trimText } from "../../utilities/trim-text.utility";

export type TtransactionData = Omit<
  ITransaction,
  "description" | "isActive" | "budget"
>;

export interface ITransactionData {
  transactionData: TtransactionData;
}

export function GoToTransactionDetailsButton({
  transactionData,
}: ITransactionData) {
  const { name, id, amount, transactionDate, category } = transactionData;

  type TransactionDetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "TransactionDetails"
  >;

  const navigation = useNavigation<TransactionDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={[buttonStyle.transactionDetailsButton]}
      onPress={() =>
        navigation.navigate("TransactionDetails", { transactionId: id })
      }
    >
      <View style={styles.textBox}>
        <Text style={textStyles.textH3Dark}>{formatPrice(amount)}</Text>
        <Text style={textStyles.textBody2}>{formatDate(transactionDate)}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={textStyles.textBody2}>
          <Text style={[textStyles.textBody2, textStyles.textBold]}>
            Name:{" "}
          </Text>
          {trimText(name)}
        </Text>
        <Text style={textStyles.textBody2}>
          <Text style={[textStyles.textBody2, textStyles.textBold]}>
            Category:{" "}
          </Text>
          {trimText(category.name, 14)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textBox: { flex: 1 },
});
