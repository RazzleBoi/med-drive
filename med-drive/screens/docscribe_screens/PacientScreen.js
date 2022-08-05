import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  UserIcon,
} from "react-native-heroicons/solid";

// import { useDispatch } from "react-redux";
// import { setDrugstore } from "../slices/drugstoreSlice";

const PacientScreen = () => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  const {
    params: {
      id, 
      address,
      email,
      username,
      prescribed_ingredients,
    },
  } = useRoute();

  // useEffect(() => {
  //   dispatch(setDrugstore({
  //     id, 
  //     address,
  //     email,
  //     username,
  //     prescribed_ingredients,
  //   }))
  // }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
    <ScrollView>
      <View className="relative">
        <UserIcon></UserIcon>

        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#348CEB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className=" text-3xl font-bold">{username}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
              <StarIcon color="blue" opacity={0.5} size={22} />
              <Text classname="text-blue-500">{email}</Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-xs text-gray-500">
                {" "}
                Nearby * {address}{" "}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="flex-row items-center space-x-2 p-4 border-y border-gray-300"
        >
          <QuestionMarkCircleIcon size={20} color="gray" opacity={0.6} />
          <Text className="pl-2 flex-1 text-md font-bold">
            Has any prescribed allergies?
          </Text>
          <ChevronRightIcon color="#348CEB" />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">
          Prescribed medications
        </Text>
         {/* {meds.map( med => (
          <MedicineRow
          key={med._id}
          id={med._id}
          name={med.title}
          description={med.short_description}
          price={med.price}
          image={med.image}
          />
         ))} */}
      </View>
    </ScrollView>
    </>
  );
};

export default PacientScreen;
