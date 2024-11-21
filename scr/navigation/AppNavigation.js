import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import VotesScreen from "../screens/VotesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import UserLoginScreen from "../screens/UserLoginScreen";
import UserSignupScreen from "../screens/UserSignupScreen";
import AllElectionScreen from "../screens/AllElectionScreen";
import CreateElectionScreen from "../screens/CreateElectionScreen";
import AddCandidateScreen from "../screens/AddCandidateScreen";
import CreateElectionSuccess from "../components/CreateElectionSuccess";
import AddCandidateSuccess from "../components/AddCandidateSuccess";
import CandidateListScreen from "../screens/CandidateListScreen";
import OtpScreen from '../screens/OtpScreen';
import BiometricScreen from '../screens/BiometricScreen';

const HomeStack = createNativeStackNavigator();
const AuthFlow = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeStackScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="AdminLogin" component={AdminLoginScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="UserLogin" component={UserLoginScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="UserSignup" component={UserSignupScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="AllElection" component={AllElectionScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="createElection" component={CreateElectionScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="AddCandidate" component={AddCandidateScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="CreateElectionSuccess" component={CreateElectionSuccess} options={{ headerShown: false }} />
      <HomeStack.Screen name="AddCandidateSuccess" component={AddCandidateSuccess} options={{ headerShown: false }} />
      <HomeStack.Screen name="CandidateList" component={CandidateListScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
};

const AuthFlowNavigator = () => (
  <AuthFlow.Navigator>
    <AuthFlow.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
    <AuthFlow.Screen name="Biometric" component={BiometricScreen} options={{ headerShown: false }} />
  </AuthFlow.Navigator>
);

// BottomTabs: Update the "Home" tab name to avoid conflicts
const BottomTabs = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Votes') {
            iconName = focused ? 'vote' : 'vote-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#43C6AC',
        tabBarInactiveTintColor: '#7E8A8C',
        tabBarStyle: isKeyboardVisible ? { display: 'none' } : { height: 60, paddingBottom: 10 },
      })}
    >
      {/* Rename "Home" tab to "MainHomeTabs" */}
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Votes" component={VotesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

// AppNavigation: No changes needed here
const AppNavigation = ({ initialRoute }) => {
  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AuthFlow" component={AuthFlowNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    </>
  );
};

export default AppNavigation;