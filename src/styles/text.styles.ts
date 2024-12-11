import { StyleSheet } from "react-native";
import { theme } from "../theme/main.theme";

export const textStyles = StyleSheet.create({
  loadingText: {
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  errorText: {
    color: theme.colors.error,
    textAlign: "center",
  },
  sucessText: {
    color: theme.colors.success,
    textAlign: "center",
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body1.fontSize,
    marginBottom: theme.spacing.small,
  },
  input: {
    backgroundColor: theme.colors.backgroundLight,
    color: theme.colors.textSecondary,
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    width: "100%",
    marginBottom: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonSmallText: {
    color: theme.colors.textPrimary,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText3: {
    color: theme.colors.textPrimary,
    textAlign: "center",
    fontSize: theme.typography.body1.fontSize,
  },
  linkText: {
    color: theme.colors.textPrimary,
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: theme.typography.body1.fontSize,
  },
  titleText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.h1.fontSize,
    marginBottom: theme.spacing.huge,
    fontWeight: "bold",
  },
  textAlignmentLeft: {
    textAlign: "left",
  },
  textAlignmentCenter: {
    textAlign: "center",
  },
  nameText: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.small,
  },
  nameTextTouchableButton: {
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.medium,
    fontSize: theme.typography.body1.fontSize,
  },
  phoneText: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.textSecondary,
    marginVertical: theme.spacing.small,
  },
  phoneTextPrimary: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.textPrimary,
    marginVertical: theme.spacing.small,
  },
  emailText: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.textSecondary,
  },
  cancelButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body1.fontSize,
  },
  bigText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body1.fontSize,
  },
  modalText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body1.fontSize,
    textAlign: "center",
  },
  searchBarInput: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: theme.typography.body1.fontSize,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: theme.colors.background,
    color: theme.colors.textPrimary,
    padding: theme.spacing.small,
  },
});
