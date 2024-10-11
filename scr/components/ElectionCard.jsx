import { View, Text, Image } from 'react-native';
import React from 'react';

const ElectionCard = ({ title, description, image }) => {
  return (
    <View className='mb-5 bg-white rounded-lg overflow-hidden shadow-lg'>
    
      <Image source={image} className='w-full h-40' />
      
      <View className='p-4'>
        <Text className='text-lg font-bold'>{title}</Text>
        <Text className='text-[#7E8A8C]'>{description}</Text>
      </View>
    </View>
  );
};

export default ElectionCard;
