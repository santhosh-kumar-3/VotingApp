import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const UserSignupScreen = () => {

    const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-primarycolor text-2xl font-bold mb-16">
        User Signup
      </Text>

      <View className="w-full mb-5">
        <Text className="text-[16px] text-black font-normal mb-2">
          Username
        </Text>
        <TextInput
          placeholder="Enter your username"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <View className="w-full mb-5">
        <Text className="text-[16px] text-black font-normal mb-2">
          Password
        </Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true}
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <View className="w-full mb-10">
        <Text className="text-[16px] text-black font-normal mb-2">
          Confirm Password
        </Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true}
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <TouchableOpacity className="w-full bg-primarycolor py-3.5 rounded-md mb-10">
        <Text className="text-white text-base text-center font-semibold">
          Sign Up
        </Text>
      </TouchableOpacity>

      <View className='flex-row h-7 self-start'>
        <Text className="text-primarycolor font-semibold my-auto">
          Already have an account? {"  "}
        </Text>
        <Text className="text-[#43C6AC] text-base self-start font-semibold underline my-auto" onPress={() => navigation.navigate('UserLogin') }>
        Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default UserSignupScreen;
