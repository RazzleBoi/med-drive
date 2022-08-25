import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { EyeIcon } from "react-native-heroicons/outline";
import { useDispatch } from "react-redux";
import { login, register } from "../slices/apiCalls";

const RegisterScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const registerF = () => {
    if (password != confirmPassword) {
      Alert.alert("Passwords must match!");
    } else {
      register(dispatch, {
        name: name,
        email: email,
        username: username,
        password: password,
      })
      .then(() => navigator.navigate("Home"))
      .catch((err) => Alert.alert(err));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 justify-items-center bg-white-300 items-center"
    >
      <StatusBar className="bg-[#00CCBB]" />
      <UserCircleIcon size={200} color="#00CCBB" />
      <Text>Register</Text>
      <View>
        <TextInput
          className="w-60 h-10 bg-white border p-2 m-2 border-[#00CCBB]"
          onChangeText={(text) => {
            setUsername(text);
          }}
          placeholder="username"
          type="text"
          value={username}
        />
        <TextInput
          className="w-60 h-10 bg-white border p-2 m-2 border-[#00CCBB]"
          onChangeText={(text) => {
            setName(text);
          }}
          placeholder="Full Name"
          autofocus
          type="text"
          value={name}
        />
        <TextInput
          className="w-60 h-10 bg-white border p-2 m-2 border-[#00CCBB]"
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="Email"
          type="email"
          autoCapitalize={"none"}
          value={email}
        />
        <View className="h-10 w-60 items-center flex-row bg-white border p-2 m-2 border-[#00CCBB]">
          <TextInput
            className="w-50"
            placeholder="Password"
            secureTextEntry={passwordVisibility}
            type="password"
            values={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            className="absolute inset-y-0 right-0"
            onPress={handlePasswordVisibility}
          >
            <EyeIcon name={rightIcon} size={25} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="h-10 w-60 items-center flex-row bg-white border p-2 m-2 border-[#00CCBB]">
          <TextInput
            className="w-50"
            placeholder="Confirm Password"
            secureTextEntry={passwordVisibility}
            type="password"
            values={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            className="absolute inset-y-0 right-0"
            onPress={handlePasswordVisibility}
          >
            <EyeIcon name={rightIcon} size={25} color="#00CCBB" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="bg-[#00CCBB] rounded p-2 m-2 w-20"
        onPress={registerF}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
