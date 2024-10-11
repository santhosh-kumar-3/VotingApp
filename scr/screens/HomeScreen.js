import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-primarycolor  text-center text-xl font-bold pt-16">
        VoteSmart
      </Text>

      <View className="flex-wrap flex-row justify-between mx-6 my-auto">

        {/* Card 1 */}
        <View className='w-[46%] mb-6'>
          <TouchableOpacity onPress={() => navigation.navigate('AdminLogin') } activeOpacity={0.6} className="bg-primarycolor flex items-center justify-center h-40 rounded-lg mb-1">
          <Ionicons name="add-circle" size={50} color={'white'} />
          </TouchableOpacity>
          <Text className='text-center text-[16px] font-normal'>Create Election</Text>
        </View>

        {/* Card 2 */}
        <View className='w-[46%] mb-6'>
          <TouchableOpacity onPress={() => navigation.navigate('AllElection') } activeOpacity={0.6} className="bg-primarycolor flex items-center justify-center h-40 rounded-lg mb-1">
          <Ionicons name="eye" size={50} color={'white'} />
          </TouchableOpacity>
          <Text className='text-center text-[16px] font-normal'>View Election</Text>
        </View>

        {/* Card 3 */}
        <View className='w-[46%] mb-6'>
          <TouchableOpacity activeOpacity={0.6} className="bg-primarycolor flex items-center justify-center h-40 rounded-lg mb-1">
          <AntDesign name="exclamationcircle" size={40} color={'white'} />
          </TouchableOpacity>
          <Text className='text-center text-[16px] font-normal'>About</Text>
        </View>

        {/* Card 4 */}
        <View className='w-[46%] mb-6'>
          <TouchableOpacity activeOpacity={0.6} className="bg-primarycolor flex items-center justify-center h-40 rounded-lg mb-1">
          <MaterialCommunityIcons name="chat-question" size={50} color={'white'} />
          </TouchableOpacity> 
          <Text className='text-center text-[16px] font-normal'>FAQ</Text>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
