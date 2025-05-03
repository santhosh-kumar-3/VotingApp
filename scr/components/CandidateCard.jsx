import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";

const CandidateCard = ({ name, partyName, profileImage, onVote }) => {
  return (
    <View className="mb-5 bg-white rounded-lg overflow-hidden shadow-lg">
      <Image source={profileImage} className="w-full h-44" />
      <View className="p-4">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-[#7E8A8C]">{partyName}</Text>
      </View>
      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-primarycolor rounded-lg px-4 py-2 shadow-md"
        onPress={onVote}
      >
        <Text className="text-white">Vote</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CandidateCard;
