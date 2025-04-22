import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import CandidateCard from "../components/CandidateCard";
import candidate1 from "../../assets/candidatePic1.png";

const CandidateListScreen = () => {
  const route = useRoute();
  const { electionId } = route.params;

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {

        const electionDocRef = doc(db, "elections", electionId);
        const electionDoc = await getDoc(electionDocRef);

        if (electionDoc.exists()) {
          const data = electionDoc.data();
          const fetchedCandidates = data.candidates || [];

          const candidatesWithDefaults = fetchedCandidates.map((candidate, index) => ({
            id: candidate["Candidate Id"] || `C${index + 1}`,
            name: candidate["Candidate Name"] || "Unknown Candidate",
            partyName: candidate["Candidate Party Name"] || "Independent",
            profileImage: candidate1,
          }));

          setCandidates(candidatesWithDefaults);
        } else {
          console.error("Election document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [electionId]);

  const navigation = useNavigation();

  const handleCardPress = (item) => {
    console.log("Selected Candidate:", item);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg mt-3">Loading Candidates...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="self-center mt-5 mb-3 text-2xl font-bold">Candidates</Text>

      {candidates.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">No candidates found for this election.</Text>
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default CandidateListScreen;
