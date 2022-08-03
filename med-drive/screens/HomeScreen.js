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
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setUser } from "../slices/userSlice";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log(authUser);
      if (!authUser) {
        navigation.navigate("SignIn");
      } else {
        dispatch(
          setUser({
            email: authUser.email,
            displayName: authUser.displayName,
            photoUrl: authUser.photoURL,
          })
        );
      }
    });

    sanityClient
      .fetch(
        `
      *[_type == "featured"] {
        ...,
        drugstores[]->{
          ...,
          meds[]->
        }
      }
      `
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth);
    dispatch(setUser(null));
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
            {" "}
            What do you need {currentUser ? currentUser.displayName : ""}?
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
            {/* <Image
              source={{
                uri: urlFor(imgUrl).url(),
              }}
              className="h-36 w-64 rounded-sm"
            /> */}
            <LogoutIcon size={35} color="#00CCBB" />
          </TouchableOpacity>
        )}
      </View>
      {/* search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-1">
        <View className="flex-row space-x-1 flex-1 bg-gray-200 p-3">
          <SearchIcon color="grey" size={20} />
          <TextInput placeholder="Meds or Drugstores" keyboardType="default" />
        </View>
        <AdjustmentsIcon color="#00CCBB" />
      </View>
      {/* content */}
      <ScrollView className="bg-gray-100">
        {/* CATEGORIES */}
        <Categories />

        {/* Featured Rows */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
