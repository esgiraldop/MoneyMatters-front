import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../interfaces";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { buttonStyle } from "../../styles/buttons.style";

interface IIconButton {
  children: React.ReactNode;
  size?: number;
  action: () => void;
  style?: Record<string, string> | null;
}

export const IconButton = ({
  children,
  size = 50,
  action,
  style,
}: IIconButton) => {
  return (
    <TouchableOpacity
      style={[
        buttonStyle.roundButton,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      onPress={action}
    >
      {children}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({});
