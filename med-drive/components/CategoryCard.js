import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
const CategoryCard = ({ title, imgUrl}) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          uri: imgUrl
        }}
        className="h-20 w-20 rounded-full"
      />
      <Text className="absolute bottom-1 left-1 font-bold text-red-700">title</Text>

    </TouchableOpacity>
  )
}

export default CategoryCard