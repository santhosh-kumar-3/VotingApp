import React, { useState } from 'react';
import { View, Text, Button, Alert, FlatList } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';

const ExcelUploader = () => {
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isFilePicked, setIsFilePicked] = useState(false); // Track if file is picked

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      console.log('Document Picker Result:', result); // Log the result

      if (result.canceled) {
        setIsFilePicked(false); // Reset state if canceled
        setFileName('');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0]; // Get the first asset from the assets array

        // Log the file name and URI to confirm it's selected
        console.log('File Selected:', file.name);
        console.log('File URI:', file.uri);

        setIsFilePicked(true); // Update state to indicate file is picked
        setFileName(file.name); // Store the file name

        const fileData = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const workbook = XLSX.read(fileData, { type: 'base64' });

        // Assuming the first sheet in the workbook
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setExcelData(jsonData);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to load the Excel file.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Button title="Pick Excel File" onPress={handleDocumentPick} />

      {/* Display message when no file is picked */}
      {!isFilePicked && !fileName && (
        <Text className="mt-4 text-sm text-gray-500">Please select an Excel file.</Text>
      )}

      {/* Display selected file name */}
      {fileName && (
        <Text className="mt-4 text-lg font-semibold">{`Selected file: ${fileName}`}</Text>
      )}

      {/* Display Excel data if available */}
      {excelData && (
        <FlatList
          data={excelData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="flex-row mt-2">
              {Object.values(item).map((value, index) => (
                <Text key={index} className="mr-2 text-sm">
                  {value}
                </Text>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ExcelUploader;
