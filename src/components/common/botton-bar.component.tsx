import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../theme/main.theme";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomBar = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const onHomePress = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Transactions" }],
      })
    );
  };

  const onSummaryPress = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "TransactionsSummary" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onHomePress}>
        <Icon name="home-outline" size={25} color={theme.colors.textPrimary} />
        <Text style={styles.darkButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSummaryPress}>
        <Icon
          name="pie-chart-outline"
          size={25}
          color={theme.colors.textPrimary}
        />
        <Text style={styles.darkButtonText}>Summary</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Icon
          name="log-out-outline"
          size={25}
          color={theme.colors.textPrimary}
        />
        <Text style={styles.darkButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.small,
    borderTopWidth: 5,
    borderTopColor: theme.colors.borderColor,
    width: "100%",
  },
  button: {
    alignItems: "center",
  },
  darkButtonText: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    // marginTop: theme.spacing.small / 2,
  },
});

export default BottomBar;
