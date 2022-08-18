import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  UserIcon,
  AdjustmentsIcon,
  SearchIcon,
  LogoutIcon,
  PlusIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";

import { userRequest } from "../../requestMethods";
import { logoutCall } from "../../slices/apiCalls";
import PacientCard from "../../components/docscribe_components/PacientCard";
import {
  addToPacients,
  removeFromPacients,
  selectPacients,
  setPacients,
} from "../../slices/pacientsSlice";
import { XCircleIcon } from "react-native-heroicons/solid";

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const pacients = useSelector(selectPacients);
  const [displayedPacients, setDisplayedPacients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const [email, setEmail] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("SignIn");
    }
  }, [currentUser]);

  useEffect(() => {
    setDisplayedPacients(pacients);
    setSearchTerm("");
  }, [pacients]);

  useEffect(() => {
    if (!!currentUser) {
      const getPacients = async () => {
        try {
          const res = await userRequest(currentUser.accessToken).get(
            "pacients/",
            { params: { doctor: currentUser._id } }
          );
          dispatch(setPacients(res.data));
        } catch (err) {
          Alert.alert(err.message);
        }
      };
      getPacients();
    }
  }, [currentUser]);

  const addPacient = (id) => {
    const addPacient = async () => {
      try {
        const res = await userRequest(currentUser.accessToken).post(
          "pacients/",
          { doctor: currentUser._id, pacient_email: email }
        );
        dispatch(addToPacients(res.data));
        setModalOpen(false);
      } catch (err) {
        Alert.alert(err.message);
      }
    };
    addPacient();
  };

  const deletePacient = (id) => {
    const removePacient = async () => {
      try {
        const res = await userRequest(currentUser.accessToken).delete(
          "pacients/:id",
          { params: { id: id}}
        );
        dispatch(removeFromPacients({id}));
      } catch (err) {
        Alert.alert(err.message);
      }
    };
    removePacient();
  };

  const logout = () => {
    logoutCall(dispatch);
  }
  const updateSearch =(text) => {
    setSearchTerm(text);
    if (text) {
      setDisplayedPacients(pacients.filter(pacient => pacient.pacient.username.startsWith(text)));
    }
    else
      setDisplayedPacients(pacients);
  };

  return (
    <>
      <Modal animationType="slide" visible={isModalOpen}>
        <KeyboardAvoidingView
          behavior="padding"
          className="top-14 flex-1 justify-items-center bg-white-300 items-center py-5"
        >
          <Text>Add a pacient by email</Text>
          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-blue-100 rounded-full"
            onPress={() => {
              setModalOpen(false);
            }}
          >
            <ArrowLeftIcon size={40} color="348CEB"></ArrowLeftIcon>
          </TouchableOpacity>
          <TextInput
            className="w-60 h-10 bg-white border p-2 m-2 border-[#00CCBB]"
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder="email"
            type="text"
            value={email}
            autoCapitalize={"none"}
          />
          <TouchableOpacity
            className="bg-white border p-2 m-2 border-[#348CEB] w-20 rounded-full"
            onPress={addPacient}
          >
            <Text>Add pacient!</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

      <SafeAreaView className="bg-white pt-5">
        <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
          <Image
            source={{
              uri: "https://t4.ftcdn.net/jpg/02/29/53/11/240_F_229531197_jmFcViuzXaYOQdoOK1qyg7uIGdnuKhpt.jpg",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <View className="flex-1">
            <Text className="font-bold text-xl">
              Hello Doc
              <PlusIcon size={20} color="red" />
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
            <TextInput
              placeholder="Search for a pacient"
              keyboardType="default"
              value={searchTerm}
              onChangeText={(text) => updateSearch(text)}
              autoCapitalize={"none"}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalOpen(true);
            }}
          >
            <PlusIcon color="#348CEB" />
          </TouchableOpacity>
        </View>
        <View className="items-center">
          {!!currentUser && currentUser.isDoctor ? (
            <TouchableOpacity
              className="bg-[#00CCBB] rounded p-2 m-2 w-80 items-center"
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text>Go to Med-drive</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
          showsHorizontalScrollIndicator={false}
          className="pt-4 justify-items-end jus"
        >
          {displayedPacients.map((pacient) => (
            <>
              <PacientCard
                key={pacient.pacient._id}
                id={pacient._id}
                address={pacient.pacient.address}
                email={pacient.pacient.email}
                username={pacient.pacient.username}
                prescribed_ingredients={pacient.prescribed_ingredients}
              />
              <View
              className="items-end">
                <TouchableOpacity
                  key={pacient._id}
                  className="bg-white border p-2 m-2 border-[#348CEB] w-20 rounded-full"
                  onPress={() => {
                    deletePacient(pacient._id);
                  }}
                >
                  <XCircleIcon size={20} />
                </TouchableOpacity>
              </View>
            </>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MainScreen;
