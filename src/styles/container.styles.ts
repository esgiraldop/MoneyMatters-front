import { StyleSheet } from "react-native";
import { theme } from "../theme/main.theme";

export const containerStyles = StyleSheet.create({
  // General Containers
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    width: "100%",
  },
  paddedContainer: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
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

  // Input fields
  inputField: {
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    width: "95%",
    marginBottom: theme.spacing.medium,
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
    backgroundColor: theme.colors.transparent,
  },
  modalView: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.large,
    alignItems: "center",
    shadowColor: theme.colors.borderColor,
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
});
