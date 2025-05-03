import { View, Text, Image } from 'react-native';
import React from 'react';

const ElectionCard = ({ title, description, image, startDate, endDate }) => {
  // Check if the dates are defined and format them to dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month (0-based)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <View className='mb-5 bg-white rounded-lg overflow-hidden shadow-lg'>
      <Image source={image} className='w-full h-40' />
      
      <View className='p-4'>
        <Text className='text-lg font-bold'>{title}</Text>
        <Text className='text-[#7E8A8C]'>{description}</Text>

        {/* Display Start and End Dates */}
        <View className='mt-2'>
          <Text className='text-sm text-[#6C757D]'>Start Date: {formattedStartDate}</Text>
          <Text className='text-sm text-[#6C757D]'>End Date: {formattedEndDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default ElectionCard;
