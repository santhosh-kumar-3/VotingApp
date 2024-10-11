import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const CandidateCard = ({ name, partyName, profileImage }) => {
  return (
    <View className="mb-5 bg-white rounded-lg overflow-hidden shadow-lg">
      <Image source={profileImage} className="w-full h-44" />

      <View className="p-4">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-[#7E8A8C]">{partyName}</Text>
      </View>

      <View>
        <TouchableOpacity
          className="absolute bottom-5 right-5 bg-primarycolor rounded-lg px-4 py-2 shadow-md"
          onPress={() => navigation.navigate("AdminLogin")}
        >
            <Text className='text-white'>Vote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CandidateCard;
