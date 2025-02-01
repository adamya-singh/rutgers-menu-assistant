import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import PreferencesScreen from './src/screens/PreferencesScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';

export type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Preferences: undefined;
  Recommendations: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#CC0033', // Rutgers Scarlet
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'RU Menu Assistant' }}
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen}
          options={{ title: "Today's Menu" }}
        />
        <Stack.Screen 
          name="Preferences" 
          component={PreferencesScreen}
          options={{ title: 'Your Preferences' }}
        />
        <Stack.Screen 
          name="Recommendations" 
          component={RecommendationsScreen}
          options={{ title: 'Your Recommendations' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}