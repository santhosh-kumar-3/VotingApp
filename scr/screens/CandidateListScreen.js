import { View, Text, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import candidate1 from "../../assets/candidatePic1.png";
import candidate2 from "../../assets/candidatePic2.png";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import CandidateCard from "../components/CandidateCard";

const CandidateListScreen = () => {
  const candidates = [
    {
      id: "1",
      name: "John Doe",
      partyName: "Democratic Party",
      profileImage: candidate1,
    },
    {
      id: "2",
      name: "Jane Smith",
      partyName: "Republican Party",
      profileImage: candidate2,
    },
    {
      id: "3",
      name: "John Doe",
      partyName: "Democratic Party",
      profileImage: candidate1,
    },
    {
      id: "4",
      name: "Jane Smith",
      partyName: "Republican Party",
      profileImage: candidate2,
    },
    {
      id: "5",
      name: "John Doe",
      partyName: "Democratic Party",
      profileImage: candidate1,
    },
  ];

  const navigation = useNavigation();

  const handleCardPress = (item) => {
    
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="self-center mt-5 mb-3 text-2xl font-bold">Candidate</Text>

      <FlatList
        data={candidates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <CandidateCard
              name={item.name}
              partyName={item.partyName}
              profileImage={item.profileImage}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 20 }}
      />
    </SafeAreaView>
  );
};

export default CandidateListScreen;
