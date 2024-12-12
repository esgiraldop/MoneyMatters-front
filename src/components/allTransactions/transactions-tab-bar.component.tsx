import { textStyles } from "../../styles";
import { TabBar } from "react-native-tab-view";
import { theme } from "../../theme/main.theme";

export const TransactionsTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: theme.colors.accent,
      height: 3,
    }}
    style={{
      backgroundColor: theme.colors.backgroundLighter,
    }}
    labelStyle={textStyles.textBody2}
  />
);
