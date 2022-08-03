import { View, Text } from 'react-native'
import React from 'react'

const Title = ({text}) => {
  return (
      <Text className="text-lg p-1 font-extrabold">{text}</Text>
  )
}

export default Title