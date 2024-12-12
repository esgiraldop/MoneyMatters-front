import { View } from "react-native";
import { Text } from "react-native-elements";
import { containerStyles, textStyles } from "../../styles";

export const TransactionsTab = () => (
  <View style={[containerStyles.paddedContainerLightBc, { flex: 1 }]}>
    <Text style={textStyles.textBody2}>Your transactions this month</Text>
    {/* Add your budget list layout here */}
  </View>
);
