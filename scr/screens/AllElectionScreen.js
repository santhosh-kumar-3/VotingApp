import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ElectionCard from "../components/ElectionCard";
import { Ionicons } from "@expo/vector-icons";
import sampleimg1 from "../../assets/sampleImg1.png";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs } from "firebase/firestore"; 

const AllElectionScreen = () => {
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchElections = async () => {
      setIsLoading(true); 
      try {
        const db = getFirestore();
        const electionsCollection = collection(db, "elections");
        const electionSnapshot = await getDocs(electionsCollection);
        const electionList = electionSnapshot.docs.map((doc) => ({
          id: doc.id,
          electionName: doc.data().electionName,
          startDate: doc.data().startDate.toDate(),
          endDate: doc.data().endDate.toDate(),
          image: sampleimg1,
          description: "Vote for the next",
        }));
        setElections(electionList);
      } catch (error) {
        console.error("Error fetching elections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchElections();
  }, []);

  const handleCardPress = (election) => {
    navigation.navigate("UserLogin", {
      electionId: election.id,
      title: election.electionName,
      description: election.description,
      image: election.image,
      startDate: election.startDate,
      endDate: election.endDate,
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-gray-500 mt-4">Loading elections...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="self-center my-3 text-2xl font-bold">Elections</Text>

      <FlatList
        data={elections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <ElectionCard
              title={item.electionName}
              description={item.description}
              image={item.image}
              startDate={item.startDate}
              endDate={item.endDate}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 20 }}
      />

      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-primarycolor rounded-lg p-4 shadow-md"
        onPress={() => navigation.navigate("AdminLogin")}
      >
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AllElectionScreen;
