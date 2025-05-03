import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import LottieView from "lottie-react-native";
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
  const [showAnimation, setShowAnimation] = useState(false);

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

  const handleVote = (candidate) => {
    console.log("Voted for:", candidate.name);
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
    }, 2500);
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

      <FlatList
        data={candidates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CandidateCard
            name={item.name}
            partyName={item.partyName}
            profileImage={item.profileImage}
            onVote={() => handleVote(item)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 20 }}
      />

      {/* Lottie Modal */}
      <Modal visible={showAnimation} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-2xl">
            <LottieView
              source={require("../../assets/animation/create-animation.json")}
              autoPlay
              loop={false}
              style={{ width: 200, height: 200 }}
            />
            <Text className="text-xl font-semibold text-center mt-2">Voted Successfully!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CandidateListScreen;
