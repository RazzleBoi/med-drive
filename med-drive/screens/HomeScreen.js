import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  AdjustmentsIcon,
  SearchIcon,
  LogoutIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import DrugStoreCard from "../components/DrugStoreCard";
import { publicRequest, userRequest } from "../requestMethods";
import { logoutCall } from "../slices/apiCalls";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [drugstores, setDrugstores] = useState([]);
  const [displayedDrugstores, setDisplayedDrugstores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if(!currentUser) {
      navigation.navigate("SignIn");
    }
  }, [currentUser]);

  useEffect(() => {
    const getDrugstores = async () => {
      try {
        const res = await userRequest(currentUser.accessToken).get( "drugstores?user_id="+currentUser._id);
        setDrugstores(res.data);
        setDisplayedDrugstores(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getDrugstores();
  }, [currentUser]);

  const logout = () => {
    logoutCall(dispatch);
  };

  const updateSearch =(text) => {
    setSearchTerm(text);
    if (text) {
      setDisplayedDrugstores(drugstores.filter(drugstore => drugstore.title.includes(text)));
    }
    else
      setDisplayedDrugstores(drugstores);
  };

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
        <Image
          source={{
            uri: "https://thumbs.dreamstime.com/b/medicine-bag-red-suitcase-first-aid-items-isolated-white-background-vector-illustration-cartoon-style-medicine-bag-red-181220744.jpg",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-300 text-xs">Deliver now!</Text>
          <Text className="font-bold text-gray-300 text-xs">
            {currentUser ? currentUser.username : " "}
          </Text>
          <Text className="font-bold text-xl">
            Current location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        {!currentUser ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn", {});
            }}
          >
            <UserIcon size={35} color="#00CCBB" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={logout}>
            <LogoutIcon size={35} color="#00CCBB" />
          </TouchableOpacity>
        )}
      </View>
      {/* search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-1">
        <View className="flex-row space-x-1 flex-1 bg-gray-200 p-3">
          <SearchIcon color="grey" size={20} />
          <TextInput
          placeholder="Meds or Drugstores" 
          keyboardType="default" 
          value={searchTerm}
          onChangeText={(text) => updateSearch(text)} />
        </View>
        <AdjustmentsIcon color="#00CCBB" />
      </View>
      <View>
      {!!currentUser && currentUser.isDoctor ? (
        <TouchableOpacity
        className="bg-[#348CEB] rounded p-2 m-2 w-60"
        onPress={() => {
          navigation.navigate('DocScribe');
        }}
        >
          <Text>Go to Doc-scribe</Text>
        </TouchableOpacity>
      ) : (<></>)}
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {displayedDrugstores.map(drugstore => (
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
    </SafeAreaView>
  );
};

export default HomeScreen;
