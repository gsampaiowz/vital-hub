import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  MontserratAlternates_700Bold,
  MontserratAlternates_500Medium,
  MontserratAlternates_600SemiBold,
} from "@expo-google-fonts/montserrat-alternates";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

import { Navigation } from "./src/screens/Navigation";
import { Login } from "./src/screens/Login";

const Stack = createNativeStackNavigator();

// SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    MontserratAlternates_700Bold,
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      // Container = Envolve toda a estrutura de navegação.
      // Navigator = Componente para a navegação.
      // Screen = Tela.
      // >> name: Nome da tela.
      // >> component: Componente que será chamado.
      // >> options ( title ): Título da tela.

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Navigation"
            component={Navigation}
            options={{ title: "Navegação" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
