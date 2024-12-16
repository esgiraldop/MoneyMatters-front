import { StyleSheet } from "react-native";
import { theme } from "../theme/main.theme";
import { Dimensions, View } from "react-native";

export const containerStyles = StyleSheet.create({
  // General Containers
  resetWidthContainer: {
    margin: 0,
    padding: 0,
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  containerLightBc: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.medium,
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    width: "100%",
  },
  centeredContainerLightBc: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundLight,
    width: "100%",
  },
  paddedContainer: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  paddedContainerLightBc: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.backgroundLight,
  },

  // Layout Containers
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetweenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Specific Containers
  buttonCarouselContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing.small,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    height: 60,
  },
  mapContainer: {
    width: "100%",
    height: "33%",
    marginBottom: theme.spacing.small,
  },
  card: {
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.large,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: theme.colors.borderColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  // Margins
  marginSmall: {
    margin: theme.spacing.small,
  },
  marginMedium: {
    margin: theme.spacing.medium,
  },
  marginLarge: {
    margin: theme.spacing.large,
  },
  marginHuge: {
    margin: theme.spacing.huge,
  },

  // Paddings
  paddingSmall: {
    margin: theme.spacing.small,
  },
  paddingMedium: {
    margin: theme.spacing.medium,
  },
  paddingLarge: {
    margin: theme.spacing.large,
  },
  paddingHuge: {
    margin: theme.spacing.huge,
  },

  //Background colors
  light: {
    backgroundColor: theme.colors.backgroundLight,
  },
  //Background colors
  darkLighter: {
    backgroundColor: theme.colors.backgroundLighter,
  },
  greenLoud: {
    backgroundColor: theme.colors.borderColor,
  },

  // Input fields
  inputField: {
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    width: "95%",
    marginBottom: theme.spacing.medium,
  },
  inputFieldDark: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    width: "95%",
    marginBottom: theme.spacing.medium,
  },
  inputFieldDarkThicker: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    width: "95%",
    marginBottom: theme.spacing.medium,
    minHeight: 100,
    textAlignVertical: "top",
  },

  // Search Bar Containers
  searchBarContainer: {
    width: "100%",
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.background,
    borderWidth: 0,
    padding: 0,
    margin: 0,
    borderRadius: theme.spacing.small,
    paddingHorizontal: theme.spacing.small,
  },
  searchBarInputContainer: {
    width: "100%",
    borderWidth: 0,
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.background,
    height: 40,
    borderRadius: theme.spacing.small,
  },

  // Modal Styles
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.transparentDark,
  },
  modalView: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.large,
    alignItems: "center",
    shadowColor: theme.colors.backgroundLight,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalSecondaryView: {
    margin: 20,
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.large,
    alignItems: "center",
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBarModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: theme.colors.transparent,
    marginTop: -110,
  },
});
