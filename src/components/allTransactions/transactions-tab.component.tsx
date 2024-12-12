import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { containerStyles, textStyles } from "../../styles";
import { IconButton } from "../common";
import { theme } from "../../theme/main.theme";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { AllTransactionsScreenNavigationProp } from "../../screens/all-transactions.screen";
import { useState } from "react";
import { SearchBarModal } from "./search-bar-modal-component";

export const TransactionsTab = () => {
  const navigation = useNavigation<AllTransactionsScreenNavigationProp>();

  const [isSearchModalVisible, setSearchModalVisible] =
    useState<boolean>(false);

  const toggleSearchModal = () => {
    setSearchModalVisible(!isSearchModalVisible);
  };

  return (
    <View style={styles.headerTabBar}>
      <View style={[containerStyles.spaceBetweenRow, styles.borderBottom]}>
        <View style={[containerStyles.containerLightBc]}>
          <Text
            style={[
              textStyles.textH4,
              textStyles.textSecondary,
              textStyles.textAlignCenter,
            ]}
          >
            Your expenses history
          </Text>
        </View>
        <View
          style={[
            containerStyles.buttonCarouselContainer,
            containerStyles.light,
          ]}
        >
          <IconButton
            size={40}
            action={() => navigation.navigate("CreateTransaction")}
            style={containerStyles.greenLoud}
          >
            <Icon
              name="add-outline"
              size={30}
              color={theme.colors.textPrimary}
            />
          </IconButton>
          <IconButton
            size={40}
            action={toggleSearchModal}
            style={containerStyles.greenLoud}
          >
            <Icon
              name="search-outline"
              size={30}
              color={theme.colors.textPrimary}
            />
          </IconButton>
          <SearchBarModal
            isSearchModalVisible={isSearchModalVisible}
            toggleSearchModal={toggleSearchModal}
          />
        </View>
      </View>
      {/* Add your budget list layout here */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTabBar: {
    ...containerStyles.paddedContainerLightBc,
    padding: theme.spacing.small,
  },
  borderBottom: {
    borderBottomColor: theme.colors.borderColor,
    borderBottomWidth: 2,
  },
});
