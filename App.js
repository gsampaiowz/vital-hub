// import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  MontserratAlternates_700Bold,
  MontserratAlternates_500Medium,
  MontserratAlternates_600SemiBold,
} from "@expo-google-fonts/montserrat-alternates";

import { Quicksand_500Medium, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

import { Navigation } from "./src/screens/Navigation";
import { Login } from "./src/screens/Login";
import { RecuperarSenha } from "./src/screens/RecuperarSenha";
import { VerificarEmail } from "./src/screens/VerificarEmail";
import { RedefinirSenha } from './src/screens/RedefinirSenha/index';
import { CriarConta } from "./src/screens/CriarConta";
import { PerfilCliente } from "./src/screens/PerfilCliente";
import { ConsultasDoutor } from './src/screens/ConsultasDoutor/index';

const Stack = createNativeStackNavigator();

// SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    MontserratAlternates_700Bold,
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    Quicksand_500Medium,
    Quicksand_600SemiBold
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
          <Stack.Screen
            name="RecuperarSenha"
            component={RecuperarSenha}
            options={{ title: "Recuperar Senha" }}
          />
          <Stack.Screen
            name="VerificarEmail"
            component={VerificarEmail}
            options={{ title: "Verificar Email" }}
          />
          <Stack.Screen
            name="RedefinirSenha"
            component={RedefinirSenha}
            options={{ title: "Redefinir Senha" }}
          />
          <Stack.Screen
            name="CriarConta"
            component={CriarConta}
            options={{ title: "Criar Conta" }}
          />
          <Stack.Screen
            name="PerfilCliente"
            component={PerfilCliente}
            options={{ title: "Perfil Cliente" }}
          />
          <Stack.Screen
            name="ConsultasDoutor"
            component={ConsultasDoutor}
            options={{ title: "Consultas Doutor" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
