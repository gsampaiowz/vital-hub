// import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  MontserratAlternates_700Bold,
  MontserratAlternates_500Medium,
  MontserratAlternates_600SemiBold,
} from "@expo-google-fonts/montserrat-alternates";

import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

import { Navigation } from "./src/screens/Navigation";
import { Login } from "./src/screens/Login";
import { RecuperarSenha } from "./src/screens/RecuperarSenha";
import { VerificarEmail } from "./src/screens/VerificarEmail";
import { RedefinirSenha } from "./src/screens/RedefinirSenha/index";
import { CriarConta } from "./src/screens/CriarConta";
import { PacientePerfil } from "./src/screens/PacientePerfil";
import { ConsultasDoutor } from "./src/screens/ConsultasDoutor/index";
import { SelecionarClinica } from "./src/screens/SelecionarClinica";
import { SelecionarMedico } from "./src/screens/SelecionarMedico";
import { ConsultasPaciente } from "./src/screens/ConsultasPaciente";
import { SelecionarData } from "./src/screens/SelecionarData";
import { Main } from "./src/screens/Main";
import { Prontuario } from "./src/screens/Prontuario";
import { LocalConsulta } from "./src/screens/LocalConsulta/index";
import { Prescricao } from "./src/screens/Prescricao";
import { createContext, useState } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

// SplashScreen.preventAutoHideAsync();
export const userContext = createContext(null);

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratAlternates_700Bold,
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
  });

  const [role, setRole] = useState(null);

  const users = [
    {
      id: 1,
      email: "medico@email.com",
      password: "123456",
      role: "medico",
    },
    {
      id: 2,
      email: "paciente@email.com",
      password: "123456",
      role: "paciente",
    },
  ];

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
      <userContext.Provider value={{ users, role, setRole }}>
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
            <Stack.Screen name="Main" component={Main} />
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
            <Stack.Screen
              name="SelecionarData"
              component={SelecionarData}
              options={{ title: "Selecionar Data" }}
            />
            <Stack.Screen
              name="Prontuario"
              component={Prontuario}
              options={{ title: "Prontuario" }}
            />
            <Stack.Screen
              name="Prescricao"
              component={Prescricao}
              options={{ title: "Prescricao" }}
            />
            <Stack.Screen
              name="LocalConsulta"
              component={LocalConsulta}
              options={{ title: "Local Consulta" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </userContext.Provider>
    );
  }
}
