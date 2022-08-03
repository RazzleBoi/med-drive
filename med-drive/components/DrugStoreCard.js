import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
const DrugStoreCard = ({
  id, 
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  meds,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
    onPress={() => {
      navigation.navigate("DrugStore", {
        id, 
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        meds,
        long,
        lat,
      })
    }}
    className="bg-white mr-3 shadow">
      <Image
        source = {{
          uri: imgUrl,
        }}
        className='h-36 w-64 rounded-sm'
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2" >{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22}/>
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500" >{rating} </Text> * {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <LocationMarkerIcon color="gray" opcaity={0.4} size={22}></LocationMarkerIcon>
          <Text className="text-xs text-gray-500"> Nearby * {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DrugStoreCard