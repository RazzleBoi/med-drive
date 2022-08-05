import { View, Text, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserCircleIcon } from 'react-native-heroicons/solid';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { login } from '../slices/apiCalls';
const SignInScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
  //     if (authUser) {
  //       dispatch(setUser({email: authUser.email, displayName: authUser.displayName, photoUrl: authUser.photoURL}));
  //       navigator.navigate("Home");
  //     }
  //   })
  //   return unsubscribe;
  // }, []);

  const signin = () => {
    login(dispatch, { email, password }).then(() => navigator.navigate("Home")).catch(() => Alert.alert());
  };

  return (
    <KeyboardAvoidingView behavior='padding' className="flex-1 justify-items-center bg-white-300 items-center">
      <StatusBar className="bg-[#00CCBB]"/>
      <UserCircleIcon size={200} color="#00CCBB" />
      <Text>SignInScreen</Text>
      <View>
        <TextInput className="w-60 bg-white border p-2 m-2 border-[#00CCBB]" onChangeText={(text) => {setEmail(text);} }  placeholder="Email" autofocus autoCapitalize={"none"} type="email" value={email}/>
        <TextInput className="w-60 bg-white border p-2 m-2 border-[#00CCBB]" placeholder="Password" secureTextEntry type="password" values={password} onChangeText={text => setPassword(text)}/>
      </View>
      <TouchableOpacity 
        className="bg-[#00CCBB] rounded p-2 m-2 w-20"
        onPress={signin}>
        <Text>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className="bg-white border p-2 m-2 border-[#00CCBB] w-20"
        onPress={() => navigator.navigate("Register")}>
        <Text>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default SignInScreen