import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../interfaces";
import { isNull } from "lodash";
import { theme } from "../../theme/main.theme";
import { RegistrationScreen } from "../../screens/register.screen";
import LoginScreen from "../../screens/login.screen";
import { AllContactsScreen } from "../../screens";

interface IStackNavigator {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const StackNavigator = ({
  isAuthenticated,
  setIsAuthenticated,
}: IStackNavigator) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName={
        !isAuthenticated && isNull(isAuthenticated) ? "Register" : "Contacts"
      }
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          fontSize: theme.fontSizes.title,
          color: theme.colors.textPrimary,
        },
        animation: "slide_from_right",
        freezeOnBlur: true,
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{ title: "User registration" }}
          />
          <Stack.Screen
            name="Login"
            // component={LoginScreen}
            options={{ title: "User login" }}
            // initialParams={{setIsAuthenticated}}
          >
            {(props) => (
              <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen
            name="Contacts"
            component={AllContactsScreen}
            options={{
              title: "Contacts",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
