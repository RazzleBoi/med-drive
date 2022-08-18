import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  PlusSmIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import {
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  selectOnePacientWithId,
  updatePrescriptionToPacient,
} from "../../slices/pacientsSlice";
import { userRequest } from "../../requestMethods";

const PacientScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  let {
    params: { id, address, email, username },
  } = useRoute();

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [changedValue, setChangedValue] = useState("");
  const [counter, setCounter] = useState(1);

  const currentUser = useSelector((state) => state.user.currentUser);
  const currentPacient = useSelector((state) =>
    selectOnePacientWithId(state, id)
  );
  const [changedIngredients, setChangedIngredients] = useState(
    currentPacient.prescribed_ingredients.reduce((hash, elem) => {
      hash[elem] = elem;
      return hash;
    }, {})
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const newDict = currentPacient.prescribed_ingredients.reduce(
      (hash, elem) => {
        hash[elem] = elem;
        return hash;
      },
      {}
    );
    setChangedIngredients(newDict);
  }, [currentPacient]);

  const updatePrescriptions = () => {
    const updatePacientPrescription = async () => {
      try {
        let arr = [];
        for (let k in changedIngredients) arr.push(changedIngredients[k]);
        const res = await userRequest(currentUser.accessToken).put(
          `pacients/${id}`,
          { prescribed_ingredients: arr }
        );
        dispatch(
          updatePrescriptionToPacient({ id: id, prescribed_ingredients: arr })
        );
        setModalOpen(false);
      } catch (err) {
        Alert.alert(err.message);
      }
    }
    updatePacientPrescription();
  };
  return (
    <>
      <ScrollView>
        <View className="relative">
          <UserIcon size={200}></UserIcon>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-blue-100 rounded-full"
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

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
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
          <Modal animationType="slide" visible={isModalOpen}>
            <KeyboardAvoidingView
              behavior="padding"
              className="top-14 flex-1 justify-items-center bg-white-300 items-center py-5"
            >
              <Text>Modify Ingredient</Text>
              <TouchableOpacity
                className="absolute top-14 left-5 p-2 bg-blue-100 rounded-full"
                onPress={() => {
                  setModalOpen(false);
                }}
              >
                <ArrowLeftIcon size={40} color="348CEB"></ArrowLeftIcon>
              </TouchableOpacity>
              <TextInput
                className="w-60 bg-white border p-2 m-2 border-[#348CEB]"
                key={currentIngredient}
                type="text"
                defaultValue={changedIngredients[currentIngredient]}
                onChangeText={(text) => {
                  setChangedValue(text);
                }}
              />
              <TouchableOpacity
                className="bg-white border p-2 m-2 border-[#348CEB] w-20 rounded-full"
                onPress={() => {
                  let c = changedIngredients;
                  c[currentIngredient] = changedValue;
                  setChangedIngredients(c);
                  updatePrescriptions();
                }}
              >
                <Text>Update!</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Modal>
          {Object.entries(changedIngredients).map(
            ([prescribed_ingredient, value]) => (
              <View className="m-2 space-x-2 flex-row">
                <TouchableOpacity
                  key={prescribed_ingredient}
                  onPress={() => {
                    setModalOpen(true);
                    setCurrentIngredient(prescribed_ingredient);
                  }}
                  className="bg-white mr-3 shadow pt-2 pb-2 w-60"
                >
                  <Text>{value}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-white border p-2 m-2 border-[#348CEB] w-20 rounded-full"
                  onPress={() => {
                    let c = changedIngredients;
                    delete c[prescribed_ingredient];
                    setChangedIngredients(c);
                    updatePrescriptions();
                  }}
                >
                  <XCircleIcon size={20} />
                </TouchableOpacity>
              </View>
            )
          )}
          <TouchableOpacity
            key={counter}
            onPress={() => {
              setModalOpen(true);
              setCurrentIngredient(counter);
              setCounter(counter + 1);
            }}
            className="bg-white mr-3 shadow items-center pt-2 pb-2"
          >
            <PlusSmIcon size={20} color="#348CEB" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default PacientScreen;
