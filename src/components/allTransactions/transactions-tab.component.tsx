import {
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import { containerStyles, textStyles } from "../../styles";
import { IconButton } from "../common";
import { SearchBar } from "@rneui/themed";
import { theme } from "../../theme/main.theme";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { AllTransactionsScreenNavigationProp } from "../../screens/all-transactions.screen";
import { useState } from "react";

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
          <Modal
            visible={isSearchModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={toggleSearchModal}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
                toggleSearchModal();
              }}
            >
              <View style={containerStyles.searchBarModal}>
                <TouchableWithoutFeedback>
                  <View style={[containerStyles.modalView, { padding: 0 }]}>
                    <SearchBar
                      containerStyle={[
                        containerStyles.searchBarContainer,
                        containerStyles.greenLoud,
                      ]}
                      inputContainerStyle={[
                        containerStyles.searchBarInputContainer,
                        containerStyles.greenLoud,
                      ]}
                      placeholder="Search..."
                      inputStyle={containerStyles.inputField}
                      placeholderTextColor={theme.colors.textSecondary}
                      onChangeText={() => {}}
                      value={""}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
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
