import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import OnboardingScreen from '../screens/OnboardingScreen';



const Stack = createNativeStackNavigator();

const AppNavigation = ({ initialRoute }) => {
  return (
    <>
    <StatusBar style='dark' backgroundColor='white' />
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerShown : false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown : false}} />
      </Stack.Navigator>
    </>
   
  )
}

export default AppNavigation