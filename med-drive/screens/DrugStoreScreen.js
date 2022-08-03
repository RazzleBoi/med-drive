import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import MedicineRow from "../components/MedicineRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setDrugstore } from "../slices/drugstoreSlice";

const DrugStoreScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
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
    },
  } = useRoute();

  useEffect(() => {
    dispatch(setDrugstore({
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      meds,
      long,
      lat,
    }))
  }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
    <BasketIcon></BasketIcon>
    <ScrollView>
      <View className="relative">
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="w-full h-56 bg-gray-300 p-4"
        />

        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className=" text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-xs text-gray-500">
                <Text classname="text-green-500">{rating}</Text> * {genre}
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-xs text-gray-500">
                {" "}
                Nearby * {address}{" "}
              </Text>
            </View>
          </View>

          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>

        <TouchableOpacity
          className="flex-row items-center space-x-2 p-4 border-y border-gray-300"
        >
          <QuestionMarkCircleIcon size={20} color="gray" opacity={0.6} />
          <Text className="pl-2 flex-1 text-md font-bold">
            Have any prescribed allergies?
          </Text>
          <ChevronRightIcon color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">
          Available Medicine
        </Text>
         {meds.map( med => (
          <MedicineRow
          key={med._id}
          id={med._id}
          name={med.name}
          description={med.short_description}
          price={med.price}
          image={urlFor(med.image).url()}
          />
         ))}
      </View>
    </ScrollView>
    </>
  );
};

export default DrugStoreScreen;
