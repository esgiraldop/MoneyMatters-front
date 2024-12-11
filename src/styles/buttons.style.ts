import { StyleSheet } from "react-native";
import { theme } from "../theme/main.theme";

export const buttonStyle = StyleSheet.create({
  // General Button Styles
  buttonBase: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.spacing.small,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    alignItems: "center",
    marginVertical: theme.spacing.small,
    borderRadius: theme.spacing.small,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.backgroundLight,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.spacing.small,
    alignItems: "center",
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.background,
    opacity: 0.6,
  },

  // Specific Button Styles
  contactDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    elevation: 1,
    shadowColor: theme.colors.textSecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roundButton: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  // Combined Buttons
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: "center",
    marginRight: theme.spacing.small,
  },
  touchableButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderColor,
  },

  // Button Wrappers
  buttonWrapper: {
    marginLeft: theme.spacing.small,
  },
  acceptButton: {
    backgroundColor: theme.colors.accent,
    marginTop: theme.spacing.small,
  },
});
