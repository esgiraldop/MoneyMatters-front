// if (__DEV__) {
//   require('./ReactotronConfig');
// }

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// import {DemoScreen} from './src/screens/demo.screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AnotherScreen, DemoScreen} from './src/screens';
import {RootStackParamList} from './src/interfaces/navigation.interface';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './src/theme/main.theme';
import {SyncProvider} from './src/contexts/contacts-syncronization.context';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'; // TODO: Maybe define this in the main app theme?
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SyncProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Demo"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.background,
              },
              headerTintColor: theme.colors.textPrimary,
              headerTitleStyle: {
                fontSize: theme.fontSizes.title,
                color: theme.colors.textPrimary,
              },
              animation: 'slide_from_right',
              freezeOnBlur: true,
            }}>
            <Stack.Screen name="Demo" component={DemoScreen} />
            <Stack.Screen
              name="AnotherScreen"
              component={AnotherScreen}
              options={{title: 'Another screen'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SyncProvider>
    </SafeAreaProvider>
  );
}

export default App;
