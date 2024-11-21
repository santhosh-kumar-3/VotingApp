import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Toast from 'react-native-toast-message';

const UserLoginScreen = () => {
  const [name, setName] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const q = query(
        collection(db, "voters"),
        where("aadhaarNumber", "==", aadhaarNumber)
      );
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data(); 
        const mobileNumber = userData.mobileNumber;
  
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Login Successful',
          text2: 'Proceeding to OTP verification.'
        });
        navigation.navigate("AuthFlow", {
          screen: "Otp",
          params: { mobileNumber },
        });
      } else {   
        Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Invalid name or Aadhaar number.',
      });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Something went wrong. Please try again.',
      });
    }
  };  

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-primarycolor text-2xl font-bold mb-16">User Login</Text>

      <View className="w-full mb-6">
        <Text className="text-[16px] text-black font-normal mb-2">Username</Text>
        <TextInput
          placeholder="Enter your username"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-[16px] text-black font-normal mb-2">Aadhaar Number</Text>
        <TextInput
          placeholder="Enter your Aadhaar Number"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
          value={aadhaarNumber}
          onChangeText={setAadhaarNumber}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity className="self-end mb-9">
        <Text className="text-primarycolor font-semibold">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-primarycolor py-3.5 rounded-md mb-4"
      >
        <Text className="text-white text-base text-center font-semibold">Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserLoginScreen;
