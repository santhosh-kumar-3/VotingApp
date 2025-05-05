import { View, Text, TextInput, TouchableOpacity,  Alert, ActivityIndicator} from 'react-native';
import { INFURA_URL, CONTRACT_ADDRESS, PRIVATE_KEY } from '@env';
import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import LottieView from "lottie-react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ABI from "../../res/ABI.json";

const AdminLoginScreen = () => {

  const navigation = useNavigation()
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const provider = new ethers.JsonRpcProvider(INFURA_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);  

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Start loading animation
      // console.log(username, password);

      const isAdmin = await contract.isAdmin(username, password);
      console.log(`Is Admin:- ${isAdmin}`)

      if (isAdmin) {
        // Store username and password in AsyncStorage
        await AsyncStorage.setItem('adminUsername', username);
        await AsyncStorage.setItem('adminPassword', password);
        await AsyncStorage.setItem('loginFlag', 'true');

        Alert.alert("Login Successful", "You are now logged in.");
        navigation.navigate('createElection');
      } else {
        Alert.alert("Login Failed", "Invalid admin credentials.");
      }
    } catch (error) {
      console.error("Error checking admin:", error);
      Alert.alert("Error", "Unable to verify admin. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
      
      <Text className="text-primarycolor text-2xl font-bold mb-16">Admin Login</Text>

      <View className="w-full mb-6">

        <Text className="text-[16px] text-black font-normal mb-2">Username</Text>
        <TextInput
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-[16px] text-black font-normal mb-2">Password</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <TouchableOpacity className="self-end mb-9">
        <Text className="text-primarycolor font-semibold">Forgot Password?</Text>
      </TouchableOpacity>

    
      <TouchableOpacity
          onPress={handleLogin}
          className={`w-full bg-primarycolor py-3.5 rounded-md mb-4 ${
            isLoading ? "opacity-60" : ""
          }`}
          disabled={isLoading}
        >
        <Text className="text-white text-base text-center font-semibold">
            Login
          </Text>
        </TouchableOpacity>
      
       
        {isLoading && (
          <View
            className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10 justify-center items-center"
          >
            <LottieView
              source={require("../../assets/animation/loading-animation.json")}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />
          </View>
        )}

    </SafeAreaView>
  );
};

export default AdminLoginScreen;
