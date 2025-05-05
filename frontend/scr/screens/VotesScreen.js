import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ElectionCard from "../components/ElectionCard";
import { Ionicons } from "@expo/vector-icons";
import sampleimg1 from "../../assets/sampleImg1.png";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import LottieView from "lottie-react-native";

const VotesScreen = () => {
  const [elections, setElections] = useState([]);
  const [filteredElections, setFilteredElections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
        setFilteredElections(electionList);
      } catch (error) {
        console.error("Error fetching elections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchElections();
  }, []);

  useEffect(() => {
    const filtered = elections.filter((election) =>
      election.electionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredElections(filtered);
  }, [searchQuery, elections]);

  const handleCardPress = (election) => {
    navigation.navigate("EachVotesScreen", {
      electionId: election.id,
      title: election.electionName,
      description: election.description,
      image: election.image,
      startDate: election.startDate,
      endDate: election.endDate,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {isLoading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-10 justify-center items-center bg-white/60">
          <LottieView
            source={require("../../assets/animation/loading-animation.json")}
            autoPlay
            loop
            style={{ width: 120, height: 120 }}
          />
          <Text className="text-gray-500 mt-4 text-base">
            Loading elections...
          </Text>
        </View>
      )}

      <Text className="self-center my-3 text-2xl font-bold">Elections</Text>

      {/* Search Input */}
      <View className="mx-4 mb-5 rounded-xl bg-white flex-row items-center px-4 shadow">
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          placeholder="Search elections..."
          className="flex-1 px-2 py-3 text-base text-gray-700"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Election List */}
      <FlatList
        data={filteredElections}
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
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 10 }}
      />
    </SafeAreaView>
  );
};

export default VotesScreen;
