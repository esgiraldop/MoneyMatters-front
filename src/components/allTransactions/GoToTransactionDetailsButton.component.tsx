import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../interfaces";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-elements";
import { ITransaction } from "../../interfaces/transaction.interface";
import { textStyles } from "../../styles/text.styles";
import { buttonStyle } from "../../styles/buttons.style";

interface ITransactionDetailsButton
  extends Pick<ITransaction, "name" | "id" | "imageUri"> {}

export function GoToContacDetailsButton({
  name,
  id,
  imageUri,
}: ITransactionDetailsButton) {
  type TransactionDetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "TransactionDetails"
  >;

  const navigation = useNavigation<TransactionDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={buttonStyle.transactionDetailsButton}
      onPress={() =>
        navigation.navigate("TransactionDetails", { transactionId: id })
      }
    >
      <Text style={textStyles.nameTextTouchableButton}>{name}</Text>
    </TouchableOpacity>
  );
}
