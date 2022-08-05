import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react-redux";
import { store } from "./store";

import HomeScreen from "./screens/HomeScreen";
import DrugStoreScreen from "./screens/DrugStoreScreen";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import StripePaymentScreen from "./screens/StripePaymentScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/docscribe_screens/MainScreen";
import PacientScreen from "./screens/docscribe_screens/PacientScreen";

const Stack = createNativeStackNavigator();

const AuthScreensOptions = {
  headerStyle: {backgroundColor: "#00CCBB"},
  headerTitleStyle: {color: "white"},
  headerTintStyle: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StripeProvider publishableKey="pk_test_51LP2xrHLGSDPVwmXgmcWzNszMpafXFGC8mOq91Ew24xflYukAkGX8ZPeKeaG18pR5g6cTkVB43Qp9ZrXsU78T4nj004CZNm29V">
          <TailwindProvider>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="DocScribe" component={MainScreen} />
              <Stack.Screen
                options={AuthScreensOptions}
                name="SignIn" 
                component={SignInScreen} />
              <Stack.Screen
                options={AuthScreensOptions}
                name="Register" 
                component={RegisterScreen} />
              <Stack.Screen name="DrugStore" component={DrugStoreScreen} />
              <Stack.Screen name="Pacient" component={PacientScreen} />
              <Stack.Screen
                name="Basket"
                component={BasketScreen}
                options={{ presentation: "modal", headerShown: false }}
              />
              <Stack.Screen
                name="PreparingOrder"
                component={PreparingOrderScreen}
                options={{
                  presentation: "fullScreenModal",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Delivery"
                component={DeliveryScreen}
                options={{
                  presentation: "fullScreenModal",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Payment"
                component={StripePaymentScreen}
                options={{
                  presentation: "fullScreenModal",
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </TailwindProvider>
        </StripeProvider>
      </Provider>
    </NavigationContainer>
  );
}
