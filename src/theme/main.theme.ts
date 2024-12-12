import { TextStyle } from "react-native"; // Import for accurate typing

export const theme = {
  colors: {
    background: "#344E41",
    backgroundLighter: "#3A5A40",
    borderColor: "#588157",
    accent: "#A3B18A",
    backgroundLight: "#DAD7CD",
    textPrimary: "#FFFFFF",
    textSecondary: "#344E41",
    textDark: "#000",
    error: "#D72A2A",
    success: "#4BB543",
    warning: "#F17300",
    transparent: "#00000080",
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontSize: 30,
      fontWeight: "700" as TextStyle["fontWeight"], // Explicitly typed
      fontFamily: "Raleway",
    },
    h2: {
      fontSize: 25,
      fontWeight: "700" as TextStyle["fontWeight"], // Explicitly typed
      fontFamily: "Raleway",
    },
    h3: {
      fontSize: 20,
      fontWeight: "700" as TextStyle["fontWeight"], // Explicitly typed
      fontFamily: "Roboto",
    },
    h4: {
      fontSize: 18,
      fontWeight: "700" as TextStyle["fontWeight"], // Explicitly typed
      fontFamily: "Roboto",
    },
    body1: {
      fontSize: 16,
      fontWeight: "400" as TextStyle["fontWeight"], // Explicitly typed
      fontFamily: "Roboto",
    },
    body2: {
      fontSize: 14,
      fontWeight: "400" as TextStyle["fontWeight"], // Explicitly typed
      fontFamily: "Roboto",
    },
    bold: {
      fontFamily: "Roboto",
      fontWeight: "bold" as TextStyle["fontWeight"], // Explicitly typed
    },
    italic: {
      fontFamily: "Roboto",
      fontStyle: "italic",
    },
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    huge: 45,
  },
};
