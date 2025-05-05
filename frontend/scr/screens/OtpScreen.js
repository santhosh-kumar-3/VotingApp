import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import StepIndicator from "../components/StepIndicator";

const OtpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { mobileNumber, electionId } = route.params;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30); // seconds
  const inputs = useRef([]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    sendOtp(); // auto send OTP on load
  }, []);

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

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://192.168.31.77:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: mobileNumber }),
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert("OTP Sent", `Code sent to ${mobileNumber}`);
        setResendTimer(30); // reset timer after sending
      } else {
        Alert.alert("Error", "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
    setIsLoading(false);
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    const enteredOtp = otp.join("");
    try {
      const response = await fetch("http://192.168.31.77:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: mobileNumber, otp: enteredOtp }),
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.success) {
        // Alert.alert("OTP Verified", "Step 1 Completed", [
        //   {
        //     text: "OK",
        //     onPress: () =>
        //       navigation.navigate("AuthFlow", {
        //         screen: "Biometric",
        //         params: { electionId },
        //       }),
        //   },
        // ]);
        Alert.alert(
          "Success",
          "Authentication Successful!",
          [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("CandidateList", { electionId }),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("Invalid OTP", "Please try again.");
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      Alert.alert("Error", "Verification failed.");
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="absolute self-center top-[15%]">
        <StepIndicator currentStep={0} totalSteps={2} />
      </View>

      <View className="mt-32 items-center">
        <Text className="text-2xl font-bold text-primarycolor mb-2">
          OTP Verification
        </Text>
        <Text className="text-gray-600 text-base text-center mb-8">
          Enter the 4-digit code sent to{" "}
          <Text className="font-semibold text-gray-800">{mobileNumber}</Text>
        </Text>

        <View className="flex-row justify-between space-x-4 mb-8">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              className="w-14 h-14 text-center text-xl bg-gray-100 border border-gray-300 rounded-xl shadow-sm"
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
          disabled={isLoading}
          className={`w-full bg-primarycolor py-3 rounded-xl ${
            isLoading ? "opacity-60" : ""
          }`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-base font-semibold text-center">
              Verify OTP
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={sendOtp}
          disabled={resendTimer > 0}
          className="mt-5"
        >
          <Text
            className={`text-sm font-medium ${
              resendTimer > 0 ? "text-gray-400" : "text-primarycolor"
            }`}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpScreen;
