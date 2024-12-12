import { View } from "react-native";
import { Text } from "react-native-elements";
import { containerStyles, textStyles } from "../../styles";

export const BudgetsTab = () => (
  <View style={[containerStyles.paddedContainerLightBc, { flex: 1 }]}>
    <Text style={textStyles.textBody2}>Your budgets this month</Text>
    {/* Add your budget list layout here */}
  </View>
);
