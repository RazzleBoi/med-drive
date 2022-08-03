import { View, Text } from 'react-native'
import React from 'react'

const FormLabel = ({text}) => {
  return (
      <Text className="text-lg p-2 font-semibold">{text}</Text>
  )
}

export default FormLabel