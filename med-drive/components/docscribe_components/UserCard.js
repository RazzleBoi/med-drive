import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { EmojiHappyIcon, StarIcon, UserIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
const UserCard = ({
  id, 
  address,
  email,
  username,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
  //   onPress={() => {
  //     navigation.navigate("DrugStore", {
  //       id, 
  //       adddress,
  // email,
  // username,
  //     })
    // }}
    className="bg-white mr-3 shadow items-center">
      <UserIcon
        size={50}
        className=' h-0.5 w-50 rounded-sm'
      />
      <View className="px-3 pb-4 items-center">
        <Text className="font-bold text-lg pt-2" >{username}</Text>
        <View className="flex-row items-center space-x-1">
          <EmojiHappyIcon color="light-blue" opacity={0.5} size={22}/>
          <Text className="text-xs ">
            {email} 
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <LocationMarkerIcon color="gray" opacity={0.4} size={22}></LocationMarkerIcon>
          <Text className="text-xs text-color-[#o34acb]"> Nearby * {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default UserCard