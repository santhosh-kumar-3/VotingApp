import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import StepIndicator from "../components/StepIndicator";
import Toast from 'react-native-toast-message';

const OtpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { mobileNumber } = route.params;
  const [otp, setOtp] = useState(["", "", "", ""]);

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
    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'OTP Verified!',
        text2: 'Step 1 Completed'
      });
      navigation.navigate("AuthFlow", { screen: "Biometric" });
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Invalid OTP. Please try again.',
      });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <View className='absolute top-[15%]'>
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
        className="w-full bg-primarycolor py-3.5 rounded-md mb-4"
      >
        <Text className="text-white text-base text-center font-semibold">
          Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;
