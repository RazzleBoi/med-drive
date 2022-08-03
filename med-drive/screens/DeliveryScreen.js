import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectDrugstore } from "../slices/drugstoreSlice";
import { XIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
const DeliveryScreen = () => {
  const navigation = useNavigation();
  const drugstore = useSelector(selectDrugstore);

  return (
    <View className="flex-1 bg-[#00CCBB]">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XIcon size={30} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://thumbs.dreamstime.com/b/medicine-bag-red-suitcase-first-aid-items-isolated-white-background-vector-illustration-cartoon-style-medicine-bag-red-181220744.jpg",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

          <Text className="mt-3 text-gray-400">
            {" "}
            Your order at {drugstore.title} is being processed
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: drugstore.lat,
          longitude: drugstore.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{ latitude: drugstore.lat, longitude: drugstore.long }}
          title={drugstore.title}
          description={drugstore.description}
          indentifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://thumbs.dreamstime.com/b/medicine-bag-red-suitcase-first-aid-items-isolated-white-background-vector-illustration-cartoon-style-medicine-bag-red-181220744.jpg",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Claudel Parodel</Text>
          <Text className="text-gray-400">Your driver</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold"> Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
