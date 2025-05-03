import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import StepIndicator from "../components/StepIndicator";

const OtpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { mobileNumber, electionId } = route.params;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Passed Election ID OTPS:", electionId);
  }, [electionId]);

  const inputs = useRef([]);

  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    setIsLoading(true); // Start loading
    const enteredOtp = otp.join("");
    setTimeout(() => {
      if (enteredOtp === "1234") {
        setIsLoading(false); // Stop loading
        Alert.alert(
          "OTP Verified!",
          "Step 1 Completed",
          [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("AuthFlow", {
                  screen: "Biometric",
                  params: { electionId },
                }),
            },
          ],
          { cancelable: false }
        );
      } else {
        setIsLoading(false); // Stop loading
        Alert.alert(
          "Invalid OTP",
          "Please try again.",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    }, 2000); // Simulating network request delay
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <View className="absolute top-[15%]">
        <StepIndicator currentStep={0} totalSteps={2} />
      </View>
      <Text className="text-primarycolor text-2xl font-bold mb-8">
        OTP Verification
      </Text>
      <Text className="text-gray-600 text-lg mb-6">
        The code was sent to {mobileNumber}
      </Text>
      <View className="flex-row justify-between mb-8 w-full px-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            className="w-14 h-14 text-center text-xl bg-inputColor rounded-md"
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(input) => (inputs.current[index] = input)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>
      <TouchableOpacity
        onPress={verifyOtp}
        className={`w-full bg-primarycolor py-3.5 rounded-md mb-4 ${
          isLoading ? "opacity-60" : ""
        }`}
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-white text-base text-center font-semibold">
            Verify
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;
