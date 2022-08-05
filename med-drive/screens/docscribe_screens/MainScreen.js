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
  PlusIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";

import { userRequest } from "../../requestMethods";
import { logoutCall } from "../../slices/apiCalls";
import UserCard from "../../components/docscribe_components/UserCard";

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [pacients, setPacients] = useState([]);
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
    if(!!currentUser){
    const getPacients = async () => {
      try {
        const res = await userRequest(currentUser.accessToken).get( "http://localhost:8080/api/users/");
        setPacients(res.data);
        console.log(pacients);
      } catch (err) {
        console.log(err.message);
      }
    };
    getPacients();
    }
  }, [currentUser]);

  const logout = () => {
    logoutCall(dispatch);
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
          <Text className="font-bold text-xl">
            Hello Doc
            <PlusIcon size={20} color="#348CEB" />
          </Text>
        </View>
        {!currentUser ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn", {});
            }}
          >
            <UserIcon size={35} color="#348CEB" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={logout}>
            <LogoutIcon size={35} color="#348CEB" />
          </TouchableOpacity>
        )}
      </View>
      {/* search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-1">
        <View className="flex-row space-x-1 flex-1 bg-gray-200 p-3">
          <SearchIcon color="grey" size={20} />
          <TextInput placeholder="Search for a pacient" keyboardType="default" />
        </View>
        <AdjustmentsIcon color="#348CEB" />
      </View>
      <View className="items-center">
      {!!currentUser && currentUser.isDoctor ? (
        <TouchableOpacity
        className="bg-[#00CCBB] rounded p-2 m-2 w-80 items-center"
        onPress={() => {
          navigation.navigate('Home');
        }}
        >
          <Text>Go to Med-drive</Text>
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
        {pacients.map(pacient => (
          <UserCard
          key={pacient._id}
          id={pacient._id}
          address={pacient.address}
          email={pacient.email}
          username={pacient.username}
        />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;