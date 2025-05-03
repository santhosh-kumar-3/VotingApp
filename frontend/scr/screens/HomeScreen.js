import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header Section */}
      <View className="py-8 bg-primarycolor rounded-b-[35px]">
        <Text className="text-center text-white text-3xl font-bold">VoteSmart</Text>
        <Text className="text-center text-white mt-2 text-base">
          A smarter way to manage elections
        </Text>
      </View>

      <View className="flex-1 mt-6 px-4 space-y-5">
        {/* Create Election */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminLogin")}
          className="bg-white flex-row items-center p-4 rounded-lg shadow-md"
          activeOpacity={0.8}
        >
          <View className="bg-primarycolor rounded-full p-3">
            <Ionicons name="add-circle" size={30} color="white" />
          </View>
          <View className="ml-4">
            <Text className="text-[19px] font-semibold pb-1 text-primarycolor">Create Election</Text>
            <Text className="text-[15px] text-gray-500">Start a new election with ease</Text>
          </View>
        </TouchableOpacity>

        {/* View Election */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AllElection")}
          className="bg-white flex-row items-center p-4 rounded-lg shadow-md"
          activeOpacity={0.8}
        >
          <View className="bg-primarycolor rounded-full p-3">
            <Ionicons name="eye" size={30} color="white" />
          </View>
          <View className="ml-4">
            <Text className="text-[19px] font-semibold pb-1 text-primarycolor">View Election</Text>
            <Text className="text-[15px] text-gray-500">Check details of ongoing elections</Text>
          </View>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          className="bg-white flex-row items-center p-4 rounded-lg shadow-md"
          activeOpacity={0.8}
        >
          <View className="bg-primarycolor rounded-full p-3">
            <AntDesign name="exclamationcircle" size={30} color="white" />
          </View>
          <View className="ml-4">
            <Text className="text-[19px] font-semibold pb-1 text-primarycolorr">About</Text>
            <Text className="text-[15px] text-gray-500">Learn more about the app</Text>
          </View>
        </TouchableOpacity>

        {/* FAQ */}
        <TouchableOpacity
          className="bg-white flex-row items-center p-4 rounded-lg shadow-md"
          activeOpacity={0.8}
        >
          <View className="bg-primarycolor rounded-full p-3">
            <MaterialCommunityIcons name="chat-question" size={30} color="white" />
          </View>
          <View className="ml-4">
            <Text className="text-[19px] font-semibold pb-1 text-primarycolor">FAQ</Text>
            <Text className="text-[15px] text-gray-500">Get answers to common questions</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
