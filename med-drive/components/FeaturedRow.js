import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import DrugStoreCard from "./DrugStoreCard";

const FeaturedRow = ({ id, title, description, featuredCategory }) => {
  const [drugstores, setDrugstores] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {drugstores.map(drugstore => (
          <DrugStoreCard
          key={drugstore._id}
          id={drugstore._id}
          imgUrl={drugstore.image}
          address={drugstore.address}
          title={drugstore.title}
          meds={drugstore.meds}
          rating={drugstore.rating}
          short_description={drugstore.short_description}
          genre={drugstore.type?.name}
          long={drugstore.long}
          lat={drugstore.lat}
        />
        ))}


      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
