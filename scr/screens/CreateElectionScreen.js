import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/Ionicons'

const CreateElectionScreen = () => {

  const navigation = useNavigation()

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const formatDate = (date) => {
    if (!date) return 'mm/dd/yyyy';
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-white px-6'>

      <Text className="text-primarycolor text-2xl font-bold mb-16">Create Election</Text>

      <View className="w-full mb-6">
        <Text className="text-[16px] text-black font-normal mb-2">Election Name</Text>
        <TextInput
          placeholder="Enter election name"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <View className="w-full mb-6">
        <Text className="text-[16px] text-black font-normal mb-2">No.of Parties</Text>
        <TextInput
          placeholder="Enter number of parties"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      {/* Start Date Field */}
      <View className="w-full mb-6">
        <Text className="text-[16px] text-black font-normal mb-2">Start Date</Text>
        <TouchableOpacity className="flex-row items-center bg-inputColor p-4 rounded-lg"
          onPress={() => setShowStartDatePicker(true)}>
          <Text className="flex-1 text-[15px] text-textColor">{formatDate(startDate)}</Text>
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
      </View>

      {/* End Date Field */}
      <View className="w-full mb-6">
        <Text className="text-[16px] text-black font-normal mb-2">End Date</Text>
        <TouchableOpacity className="flex-row items-center bg-inputColor p-4 rounded-lg"
          onPress={() => setShowEndDatePicker(true)}>
          <Text className="flex-1 text-[15px] text-textColor">{formatDate(endDate)}</Text>
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
      </View>

      <TouchableOpacity onPress={ () => navigation.navigate('CreateElectionSuccess')} className="w-full bg-primarycolor py-3.5 rounded-md mt-9 mb-4">
        <Text className="text-white text-base text-center font-semibold">Create</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default CreateElectionScreen
