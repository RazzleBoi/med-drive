import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-web'

const FormButton = ({clickFunction, text}) => {
  return (
    <TouchableOpacity className="bg-green-500 border-none px-6 py-2 rounded-">
      <Text className="text-center text-white font-bold">{text}</Text>
    </TouchableOpacity>
  )
}

export default FormButton