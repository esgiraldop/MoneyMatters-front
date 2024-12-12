import React from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, View } from "react-native";
import { containerStyles } from "../../styles";
import { SearchBar } from "@rneui/themed";
import { theme } from "../../theme/main.theme";

interface ISearchModal {
  isSearchModalVisible: boolean;
  toggleSearchModal: () => void;
}

export const SearchBarModal = ({
  isSearchModalVisible,
  toggleSearchModal,
}: ISearchModal) => {
  return (
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
  );
};
