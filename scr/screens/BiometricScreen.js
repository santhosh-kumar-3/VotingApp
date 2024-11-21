import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import StepIndicator from "../components/StepIndicator";
import Toast from 'react-native-toast-message';

const BiometricScreen = () => {
  const navigation = useNavigation();

  const handleBiometricAuth = async () => {
    try {
      const isCompatible = await LocalAuthentication.hasHardwareAsync();
      if (!isCompatible) {
        Alert.alert(
          "Error",
          "Your device does not support biometric authentication."
        );
        return;
      }

      const hasBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!hasBiometrics) {
        Alert.alert("Error", "No biometric records found on your device.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Fingerprint",
        fallbackLabel: "Enter Password",
      });

      if (result.success) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Authentication Successful!',
        });
        navigation.navigate("HomeStackScreen");
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Authentication Failed. Please try again.',
        });
      }
    } catch (error) {
      Alert.alert("Error", `An error occurred: ${error.message}`);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="absolute top-[15%]">
        <StepIndicator currentStep={1} totalSteps={2} />
      </View>
      <Text className="text-2xl font-bold mb-14">Biometric Authentication</Text>
      <TouchableOpacity
        className="bg-primarycolor py-3 px-6 rounded-md"
        onPress={handleBiometricAuth}
      >
        <Text className="text-white text-lg font-semibold">Authenticate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BiometricScreen;
