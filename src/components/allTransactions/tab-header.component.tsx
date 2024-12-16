import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { containerStyles, textStyles } from "../../styles";
import { Text } from "react-native-elements";
import { IconButton } from "../common";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../theme/main.theme";
import { SearchBarModal } from "./search-bar-modal-component";

interface ITabHeader {
  plusIconButtonAction: () => void;
  searchIconButtonAction: () => void;
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

export const TabHeader = ({
  plusIconButtonAction,
  searchIconButtonAction,
  children,
}: ITabHeader) => {
  return (
    <View style={[containerStyles.spaceBetweenRow, styles.borderBottom]}>
      <View style={[containerStyles.containerLightBc]}>
        <Text
          style={[
            textStyles.textH4,
            textStyles.textSecondary,
            textStyles.textAlignCenter,
          ]}
        >
          {typeof children === "function" ? children() : children}
        </Text>
      </View>
      <View
        style={[containerStyles.buttonCarouselContainer, containerStyles.light]}
      >
        <IconButton
          size={40}
          action={plusIconButtonAction}
          style={containerStyles.greenLoud}
        >
          <Icon name="add-outline" size={30} color={theme.colors.textPrimary} />
        </IconButton>
        <IconButton
          size={40}
          action={searchIconButtonAction}
          style={containerStyles.greenLoud}
        >
          <Icon
            name="search-outline"
            size={30}
            color={theme.colors.textPrimary}
          />
        </IconButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomColor: theme.colors.borderColor,
    borderBottomWidth: 2,
  },
});
