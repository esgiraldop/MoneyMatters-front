import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { theme } from "../../theme/main.theme";

const AppSplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SplashScreen.hide(); // Hide static splash screen once app is ready

    // Start the animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(textFadeAnim, {
        toValue: 1,
        delay: 800,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, textFadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/img/ic_launcher.png")}
        style={[
          styles.icon,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      />
      <Animated.Text style={[styles.text, { opacity: textFadeAnim }]}>
        Money Matters
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background, // use your theme's background color
  },
  icon: {
    width: 100, // adjust as needed
    height: 100,
  },
  text: {
    fontSize: theme.typography.h3.fontSize, // or theme's font size for title
    color: theme.colors.textPrimary, // theme's text color
    textAlign: "center",
  },
});

export default AppSplashScreen;
