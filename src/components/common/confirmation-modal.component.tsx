import React from "react";
import { ActivityIndicator, Modal, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { IAskUserSyncModalOpen } from "../../contexts/contacts-syncronization.context";
import { isNull } from "../../utilities/checkIsNull.utility";
import { buttonStyle } from "../../styles/buttons.style";
import { textStyles } from "../../styles/text.styles";
import { containerStyles } from "../../styles/container.styles";
import { theme } from "../../theme/main.theme";

interface IConfirmationModal<T> {
  children: React.ReactNode;
  confirmationModalVisible: T;
  setConfirmationModalVisible: (confirmationModalVisible: T) => void;
  handleAccept: () => void;
  requiresCancel: boolean;
  handleCancel?: () => void;
  isSubmitting?: boolean | null;
}

// Type guard to check if T is IAskUserSyncModalOpen
function isAskUserSyncModalOpen(
  value: unknown
): value is IAskUserSyncModalOpen {
  return (
    typeof value === "object" &&
    value !== null &&
    "isModalOpen" in value &&
    (typeof (value as IAskUserSyncModalOpen).isModalOpen === "boolean" ||
      isNull((value as IAskUserSyncModalOpen).isModalOpen))
  );
}

export const ConfirmationModal = <T,>({
  children,
  confirmationModalVisible,
  setConfirmationModalVisible,
  handleAccept,
  requiresCancel,
  handleCancel = () => null,
  isSubmitting,
}: IConfirmationModal<T>): React.JSX.Element => {
  const evalConfirmationModalVisible = (): boolean => {
    if (typeof confirmationModalVisible === "boolean") {
      return confirmationModalVisible;
    } else if (isAskUserSyncModalOpen(confirmationModalVisible)) {
      if (!isNull(confirmationModalVisible.isModalOpen)) {
        return !!confirmationModalVisible.isModalOpen;
      }
      return false;
    } else {
      return false;
    }
  };
  const handleClose = () => {
    handleCancel();
    if (typeof confirmationModalVisible === "boolean") {
      setConfirmationModalVisible(false as T);
    } else {
      setConfirmationModalVisible({
        ...confirmationModalVisible,
        isModalOpen: false,
      } as T);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={evalConfirmationModalVisible()}
      onRequestClose={handleClose}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={textStyles.modalText}>{children}</Text>
          <View style={containerStyles.complexButtonContainerLight}>
            <TouchableOpacity
              style={buttonStyle.button5}
              onPress={handleAccept}
            >
              {isSubmitting ? (
                <ActivityIndicator
                  size="large"
                  color={theme.colors.textPrimary}
                />
              ) : (
                <Text style={textStyles.darkButtonText}>Accept</Text>
              )}
            </TouchableOpacity>
            {requiresCancel && (
              <TouchableOpacity
                style={buttonStyle.button5}
                onPress={handleClose}
              >
                <Text style={textStyles.darkButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
