import React, { useState } from "react"; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  ScrollView, // Import ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import sheetimg from "../../assets/sheets.png";
import * as XLSX from "xlsx";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const CreateElectionScreen = () => {
  const navigation = useNavigation();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [fileName, setFileName] = useState("");
  const [electionName, setElectionName] = useState("");
  const [noOfParties, setNoOfParties] = useState("");
  const [candidatesData, setCandidatesData] = useState([]);

  const [formErrors, setFormErrors] = useState({
    electionName: "",
    noOfParties: "",
    startDate: "",
    endDate: "",
    fileName: "",
  });

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const formatDate = (date) => {
    if (!date) return "mm/dd/yyyy";
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ], // Only allow Excel files
      });

      if (result.canceled) {
        setFileName("");
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setFileName(file.name);

        // Read the Excel file
        const response = await fetch(file.uri);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Parse the sheet into JSON
        const data = XLSX.utils.sheet_to_json(sheet);
        setCandidatesData(data); 
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to load the file.");
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!electionName) {
      isValid = false;
      errors.electionName = "Election name is required.";
    }

    if (!noOfParties || isNaN(noOfParties) || parseInt(noOfParties) <= 0) {
      isValid = false;
      errors.noOfParties = "Number of parties is required";
    }

    if (!startDate) {
      isValid = false;
      errors.startDate = "Start date is required.";
    }

    if (!endDate) {
      isValid = false;
      errors.endDate = "End date is required.";
    }

    if (!fileName) {
      isValid = false;
      errors.fileName = "Candidates file is required.";
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleCreateElection = async () => {
    if (!validateForm()) return;

    try {
      const electionRef = await addDoc(collection(db, "elections"), {
        electionName,
        noOfParties,
        startDate,
        endDate,
        candidates: candidatesData, 
      });

      console.log("Election created with ID:", electionRef.id);
      navigation.navigate("CreateElectionSuccess");
    } catch (error) {
      console.error("Error adding election:", error);
      Alert.alert("Error", "Failed to create election.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="text-primarycolor text-2xl text-center font-bold mb-8 mt-10">
          Create Election
        </Text>

        <View className="w-full mb-6">
          <Text className="text-[16px] text-black font-normal mb-2">
            Election Name
          </Text>
          <TextInput
            placeholder="Enter election name"
            value={electionName}
            onChangeText={setElectionName}
            className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
          />
          {formErrors.electionName && (
            <Text className="text-red-500 text-sm">{formErrors.electionName}</Text>
          )}
        </View>

        <View className="w-full mb-6">
          <Text className="text-[16px] text-black font-normal mb-2">
            No.of Parties
          </Text>
          <TextInput
            placeholder="Enter number of parties"
            value={noOfParties}
            onChangeText={setNoOfParties}
            className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
          />
          {formErrors.noOfParties && (
            <Text className="text-red-500 text-sm">{formErrors.noOfParties}</Text>
          )}
        </View>

        {/* Start Date Field */}
        <View className="w-full mb-6">
          <Text className="text-[16px] text-black font-normal mb-2">
            Start Date
          </Text>
          <TouchableOpacity
            className="flex-row items-center bg-inputColor p-4 rounded-lg"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text className="flex-1 text-[15px] text-textColor">
              {formatDate(startDate)}
            </Text>
            <Icon name="calendar" size={20} color="gray" />
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}
          {formErrors.startDate && (
            <Text className="text-red-500 text-sm">{formErrors.startDate}</Text>
          )}
        </View>

        {/* End Date Field */}
        <View className="w-full mb-6">
          <Text className="text-[16px] text-black font-normal mb-2">
            End Date
          </Text>
          <TouchableOpacity
            className="flex-row items-center bg-inputColor p-4 rounded-lg"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text className="flex-1 text-[15px] text-textColor">
              {formatDate(endDate)}
            </Text>
            <Icon name="calendar" size={20} color="gray" />
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={onEndDateChange}
            />
          )}
          {formErrors.endDate && (
            <Text className="text-red-500 text-sm">{formErrors.endDate}</Text>
          )}
        </View>

        {/* File Upload Section */}
        <View className="w-full mb-6">
          <Text className="text-[16px] text-black font-normal mb-2">
            Add Candidate
          </Text>

          {!fileName && (
            <TouchableOpacity
              className="flex-row items-center justify-center bg-primarycolor p-4 rounded-lg shadow-md"
              onPress={handleDocumentPick}
            >
              <Icon
                name="cloud-upload-outline"
                size={20}
                color="white"
                className="mr-2"
              />
              <Text className="text-white text-[15px] font-semibold">
                Upload Excel File
              </Text>
            </TouchableOpacity>
          )}

          {fileName ? (
            <View className="flex-row items-center mt-4 bg-gray-100 rounded-lg p-3 shadow-md">
              <Image
                source={sheetimg}
                style={{ width: 40, height: 40, marginRight: 8 }}
              />
              <Text className="text-[16px] text-black flex-1">{fileName}</Text>
              <TouchableOpacity onPress={() => setFileName("")}>
                <Icon name="close-circle-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ) : (
            <Text className="text-[15px] text-gray-400 mt-4 text-center">
              No file selected
            </Text>
          )}

          {formErrors.fileName && (
            <Text className="text-red-500 text-sm">{formErrors.fileName}</Text>
          )}
        </View>

        {/* Create Button */}
        <TouchableOpacity
          onPress={handleCreateElection}
          className="w-full bg-primarycolor py-3.5 rounded-md mt-4 mb-4"
        >
          <Text className="text-white text-base text-center font-semibold">
            Create
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateElectionScreen;
