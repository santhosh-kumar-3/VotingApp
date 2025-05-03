import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/Ionicons'

const AddCandidateScreen = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-white px-6'>

      <Text className="text-primarycolor text-2xl font-bold mb-16">Add Candidate</Text>

      <View className="w-full mb-6">
        <Text className="text-[16px] text-black font-normal mb-2">Candidate ID</Text>
        <TextInput
          placeholder="Enter candidate ID"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <View className="w-full mb-6">
        <Text className="text-[16px] text-black font-normal mb-2">Candidate Name</Text>
        <TextInput
          placeholder="Enter full name"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>
    
      <View className="w-full mb-6">
        <Text className="text-[16px] text-black font-normal mb-2">Candidate Party ID</Text>
        <TextInput
          placeholder="Enter party ID"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <View className="w-full mb-6">
        <Text className="text-[16px] text-black font-normal mb-2">Candidate Party Name</Text>
        <TextInput
          placeholder="Enter party name"
          className="w-full text-[15px] text-textColor p-4 bg-inputColor rounded-lg"
        />
      </View>

      <TouchableOpacity onPress={ () => navigation.navigate('AddCandidateSuccess')} className="w-full bg-primarycolor py-3.5 rounded-md mt-9 mb-4">
        <Text className="text-white text-base text-center font-semibold">Create</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default AddCandidateScreen