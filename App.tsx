import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SyncProvider } from "./src/contexts/contacts-syncronization.context";
import AppSplashScreen from "./src/components/register/App-splash-screen.component";
// import {AuthProvider, useAuth} from './src/contexts/auth.context';
import { isTokenValid } from "./src/utilities/check-is-token-valid.utility";
import BottomBar from "./src/components/common/botton-bar.component";
import { StackNavigator } from "./src/components/common/stack-navigator.component";

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const isDarkMode = useColorScheme() === "dark";
  // const {isAuthenticated, setIsAuthenticated, isLoadingAuth} = useAuth(); // This didn't work
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Set a timer to transition to the main app
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      setIsAuthenticated(await isTokenValid());
    };
    checkToken();
  }, []);

  return (
    // <AuthProvider> // This didn't work
    <SafeAreaProvider style={backgroundStyle}>
      <View style={{ flex: 1 }}>
        {showSplash ? (
          <AppSplashScreen />
        ) : (
          <>
            <StatusBar
              barStyle={isDarkMode ? "light-content" : "dark-content"}
              // barStyle={'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <SyncProvider>
              <NavigationContainer>
                <StackNavigator
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
                {isAuthenticated && (
                  <BottomBar setIsAuthenticated={setIsAuthenticated} />
                )}
              </NavigationContainer>
            </SyncProvider>
          </>
        )}
      </View>
    </SafeAreaProvider>
    // </AuthProvider>
  );
}

export default App;
