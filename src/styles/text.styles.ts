import { StyleSheet } from "react-native";
import { theme } from "../theme/main.theme";

export const textStyles = StyleSheet.create({
  // Text Colors
  textPrimary: {
    color: theme.colors.textPrimary,
  },
  textSecondary: {
    color: theme.colors.textSecondary,
  },
  textError: {
    color: theme.colors.error,
  },
  textSuccess: {
    color: theme.colors.success,
  },
  textWarning: {
    color: theme.colors.warning,
  },

  // Typography Sizes and Weights
  textH1: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.colors.textPrimary,
  },
  textH1Dark: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.colors.textSecondary,
  },
  textH2: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    fontFamily: theme.typography.h2.fontFamily,
    color: theme.colors.textPrimary,
  },
  textH2Dark: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    fontFamily: theme.typography.h2.fontFamily,
    color: theme.colors.textSecondary,
  },
  textH3: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    fontFamily: theme.typography.h3.fontFamily,
    color: theme.colors.textPrimary,
  },
  textH3Dark: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    fontFamily: theme.typography.h3.fontFamily,
    color: theme.colors.textSecondary,
  },
  textH4: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    fontFamily: theme.typography.h4.fontFamily,
    color: theme.colors.textPrimary,
  },
  textH4Dark: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    fontFamily: theme.typography.h4.fontFamily,
    color: theme.colors.textSecondary,
  },
  textBody1: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
    fontFamily: theme.typography.body1.fontFamily,
    color: theme.colors.textPrimary,
  },
  textBody2: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    fontFamily: theme.typography.body2.fontFamily,
    color: theme.colors.textSecondary,
  },
  textBold: {
    fontWeight: theme.typography.bold.fontWeight,
    fontFamily: theme.typography.bold.fontFamily,
  },
  textItalic: {
    fontStyle: "italic", // Corrected to match TypeScript expectations
    fontFamily: theme.typography.italic.fontFamily,
  },

  // Text Alignment
  textAlignLeft: {
    textAlign: "left",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  textAlignRight: {
    textAlign: "right",
  },

  // Input and Buttons
  inputField: {
    color: theme.colors.textSecondary,
    width: "100%",
  },
  darkButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.bold.fontWeight,
    textAlign: "center",
  },
  lightButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.bold.fontWeight,
    textAlign: "center",
  },

  // Special Use Cases
  sectionHeader: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    backgroundColor: theme.colors.backgroundLighter,
    color: theme.colors.textPrimary,
    padding: theme.spacing.small,
  },
  linkText: {
    color: theme.colors.accent,
    textDecorationLine: "underline",
    fontWeight: theme.typography.bold.fontWeight,
    fontSize: theme.typography.body1.fontSize,
  },
  modalText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body1.fontSize,
    textAlign: "center",
  },
});
