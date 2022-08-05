import { View, Text, TextInput, TouchableOpacity, Alert, Button } from "react-native";
import React, { useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import { selectBasketTotal } from "../slices/basketSlice";
import { useNavigation } from "@react-navigation/native";

const StripePaymentScreen = () => {
  const navigation = useNavigation();
  const stripe = useStripe();
  const [name, setName] = useState("");
  const amount = useSelector(selectBasketTotal);

  const pay = async () => {
    try {
      const response = await fetch("http:localhost:8080/api/stripe/pay", {
        method: "POST",
        body: JSON.stringify({ name, amount }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete. Thank you!");
      navigation.navigate("Delivery");
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <View className="flex-1 justify-between p-5 items-center my-60">
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
        // className="absolute top-20 w-4 p-10 text-xl b-1 bg-green-500"
        style={{
          width: 300,
          fontSize: 20,
          padding: 10,
          borderWidth: 1,
        }}
      ></TextInput>
      <Button title="Pay for order" onPress={pay}/>
    </View>
  );
};

export default StripePaymentScreen;
