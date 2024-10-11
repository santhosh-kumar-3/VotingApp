import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ElectionCard from "../components/ElectionCard";
import { Ionicons } from "@expo/vector-icons";
import sampleimg1 from "../../assets/sampleImg1.png";
import sampleimg2 from "../../assets/sampleImg2.png";
import { useNavigation } from "@react-navigation/native";

const AllElectionScreen = () => {
  const elections = [
    {
      id: "1",
      title: "Presidential Election",
      description: "Vote for the next president",
      image: sampleimg1,
    },
    {
      id: "2",
      title: "Council Election",
      description: "Elect your local council",
      image: sampleimg2,
    },
    {
      id: "3",
      title: "Presidential Election",
      description: "Vote for the next president",
      image: sampleimg1,
    },
    {
      id: "4",
      title: "Council Election",
      description: "Elect your local council",
      image: sampleimg2,
    },
    {
      id: "5",
      title: "Presidential Election",
      description: "Vote for the next president",
      image: sampleimg1,
    },
    {
      id: "6",
      title: "Council Election",
      description: "Elect your local council",
      image: sampleimg2,
    },
    {
      id: "7",
      title: "Presidential Election",
      description: "Vote for the next president",
      image: sampleimg1,
    },
    {
      id: "8",
      title: "Council Election",
      description: "Elect your local council",
      image: sampleimg2,
    },
  ];

  const navigation = useNavigation()

  const handleCardPress = (election) => {
    navigation.navigate("UserLogin", {
      title: election.title,
      description: election.description,
      image: election.image,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="self-center my-3 text-2xl font-bold">Elections</Text>

      <FlatList
        data={elections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
          <ElectionCard
            title={item.title}
            description={item.description}
            image={item.image}
          />
        </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 20 }}
      />

      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-primarycolor rounded-lg p-4 shadow-md"
        onPress={() => navigation.navigate('AdminLogin') }
      >
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AllElectionScreen;
