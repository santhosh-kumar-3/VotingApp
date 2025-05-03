import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const AddCandidateSuccess = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 items-center bg-white px-6">
      <LottieView
        source={require("../../assets/animation/create-animation.json")}
        className="w-[250px] h-[250px] mt-28"
        autoPlay={true}
        loop={false}
      />
      <Text className="text-black text-[24px] font-bold mb-5">
        Candidate Added Successfully!
      </Text>

      <Text className="text-black text-[14px] text-center font-medium mb-10">
        The Candidate has been added to election successfully.
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("AddCandidate")}
        className="w-full bg-primarycolor flex-row items-center justify-center py-3.5 rounded-md mb-4"
      >
        <Icon name="add" size={25} color="white" />
        <Text className="text-white text-base text-center font-semibold">
          {" "}
          Add Candidate
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="w-full bg-primarycolor flex-row items-center justify-center py-3.5 rounded-md mb-4"
      >
        <Icon name="arrow-back" size={23} color="white" />
        <Text className="text-white text-base text-center font-semibold">
          {" "}
          Back to Home
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default AddCandidateSuccess;
