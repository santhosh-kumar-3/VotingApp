import { View, Text, ScrollView, Dimensions } from "react-native";
import { INFURA_URL, CONTRACT_ADDRESS, PRIVATE_KEY } from '@env';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { ethers } from "ethers";
import ABI from "../../res/ABI.json";
import { PieChart } from 'react-native-chart-kit';

const EachVotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const provider = new ethers.JsonRpcProvider(INFURA_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const { electionId, title, description, image, startDate, endDate } = route.params;

  const fetchCandidates = async () => {
    try {
      const [, candidateIds] = await contract.getElection(electionId.toString());
      const db = getFirestore();
      const electionDocRef = doc(db, "elections", electionId);
      const electionDoc = await getDoc(electionDocRef);

      if (electionDoc.exists()) {
        const data = electionDoc.data();
        const candidatesArray = data.candidates || [];

        const candidateList = await Promise.all(
          candidatesArray.map(async (candidate) => {
            const candidateId = candidate["Candidate Id"];
            let voteCount = "0";
            try {
              const contractCandidate = await contract.candidates(candidateId);
              voteCount = contractCandidate.voteCount.toString();
            } catch (err) {
              console.log(`Candidate ${candidateId} not found in contract`);
            }

            return {
              id: candidateId,
              name: candidate["Candidate Name"],
              partyId: candidate["Candidate Party Id"],
              partyName: candidate["Candidate Party Name"],
              voteCount,
            };
          })
        );

        setCandidates(candidateList);
      }
    } catch (error) {
      console.error("Error fetching election or candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const screenWidth = Dimensions.get("window").width;

  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#C9CBCF", "#8BC34A"
  ];

  const chartData = candidates.map((c, index) => ({
    name: c.name,
    population: parseInt(c.voteCount),
    color: colors[index % colors.length],
    legendFontColor: "#000",
    legendFontSize: 14,
  }));

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <Text className="text-xl font-bold">{title}</Text>
        <Text className="text-sm text-gray-600 mt-1">{description}</Text>
        <Text className="mt-1">Start: {new Date(startDate).toLocaleDateString()}</Text>
        <Text>End: {new Date(endDate).toLocaleDateString()}</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-full bg-primarycolor flex-row items-center justify-center py-3.5 rounded-md mt-4 mb-2"
        >
          <Text className="text-white text-base text-center font-semibold">Back</Text>
        </TouchableOpacity>

        {/* Chart Section */}
        {candidates.length > 0 && (
          <View className="mt-4">
            <Text className="text-lg font-semibold mb-2">Vote Distribution</Text>
            <PieChart
              data={chartData}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"16"}
              absolute
            />
          </View>
        )}

        {/* Candidate Cards */}
        {candidates.map((candidate, index) => (
          <View
            key={`${candidate.id || index}`}
            className="bg-white rounded-md p-4 mt-4 shadow-sm border border-gray-200"
          >
            <Text className="font-semibold text-lg">{candidate.name}</Text>
            <Text className="text-sm text-gray-700 mt-1">ID: {candidate.id}</Text>
            <Text className="text-sm text-gray-700">Party: {candidate.partyName}</Text>
            <Text className="text-sm text-gray-700">Votes: {candidate.voteCount}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EachVotesScreen;
