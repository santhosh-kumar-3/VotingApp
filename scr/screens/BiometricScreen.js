import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useRoute, useNavigation } from "@react-navigation/native";
import StepIndicator from "../components/StepIndicator";

const BiometricScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { electionId } = route.params;

  useEffect(() => {
    console.log("Passed Election ID BioS:", electionId);
  }, [electionId]);

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
        Alert.alert(
          "Success",
          "Authentication Successful!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("CandidateList", { electionId })
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Authentication Failed",
          "Please try again.",
          [{ text: "OK" }],
          { cancelable: false }
        );
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
