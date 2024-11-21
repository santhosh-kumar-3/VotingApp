import React from "react";
import { View, Text } from "react-native";

const StepIndicator = ({ currentStep }) => {
  const steps = ["OTP Verify", "Biometric Auth"];
  const totalSteps = steps.length;

  return (
    <View className="w-full flex-col items-center mb-4 ab">
      {/* Step Indicator */}
      <View className="flex-row items-center justify-center w-[55%] ">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step Circle */}
              <View
                className={`w-10 h-10 rounded-full ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-white border-2 border-green-500"
                    : "bg-white border-2 border-gray-300"
                } flex justify-center items-center`}
              >
                <Text
                  className={`font-bold text-lg ${
                    isCompleted ? "text-white" : isActive ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {index + 1}
                </Text>
              </View>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <View className="flex-1 h-1 mx-0">
                  <View
                    className={`h-full ${
                      currentStep > index ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Step Descriptions */}
      <View className="flex-row justify-between w-[90%] mt-2">
        {steps.map((step, index) => (
          <Text
            key={index}
            className={`text-base ${
              index === currentStep ? "text-green-500 font-bold" : "text-gray-500"
            }`}
            style={{ width: `${100 / totalSteps}%`, textAlign: "center" }}
          >
            {step}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default StepIndicator;
