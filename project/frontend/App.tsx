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
  DiningHallMenu: {
    diningHallId: string;
    diningHallName: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#CC0033',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Preferences"
          component={PreferencesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recommendations"
          component={RecommendationsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}