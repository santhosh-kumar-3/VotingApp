import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const AdminLoginScreen = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
      
      <Text className="text-primarycolor text-2xl font-bold mb-16">Admin Login</Text>

      <View className="w-full mb-6">

        <Text className="text-[16px] text-black font-normal mb-2">Username</Text>
        <TextInput
          placeholder="Enter your username"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-[16px] text-black font-normal mb-2">Password</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true}
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <TouchableOpacity className="self-end mb-9">
        <Text className="text-primarycolor font-semibold">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('createElection') } className="w-full bg-primarycolor py-3.5 rounded-md mb-4">
        <Text className="text-white text-base text-center font-semibold">Login</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default AdminLoginScreen;
