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
import { PacientePerfil } from "./src/screens/PacientePerfil";
import { ConsultasDoutor } from './src/screens/ConsultasDoutor/index';
import { SelecionarClinica } from "./src/screens/SelecionarClinica";
import { SelecionarMedico } from "./src/screens/SelecionarMedico";
import { ConsultasPaciente } from "./src/screens/ConsultasPaciente";

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
            name="PacientePerfil"
            component={PacientePerfil}
            options={{ title: "Paciente Perfil" }}
          />
          <Stack.Screen
            name="ConsultasDoutor"
            component={ConsultasDoutor}
            options={{ title: "Consultas Doutor" }}
          />
          <Stack.Screen
            name="ConsultasPaciente"
            component={ConsultasPaciente}
            options={{ title: "Consultas Paciente" }}
          />
          <Stack.Screen
            name="SelecionarClinica"
            component={SelecionarClinica}
            options={{ title: "Selecionar Clinica" }}
          />
          <Stack.Screen
            name="SelecionarMedico"
            component={SelecionarMedico}
            options={{ title: "Selecionar Médico" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
