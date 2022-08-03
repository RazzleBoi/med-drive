import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  });
  return (
    <SafeAreaView className="flex-1 bg-[#00CCBB] items-center justify-center">
      <Animatable.Image
      source={require("../assets/medicine-order-loading.gif")}
      animation="slideInUp"
      iterationCount={1}
      className="h-96 w-96"
      />
      <Animatable.Text
      animation="slideInUp"
      iterationCount={1}
      className="text-white text-lg my-10 font-bold text-center"
      >
        Your Payment is being processed!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white"/>

    </SafeAreaView>
  )
}

export default PreparingOrderScreen