import { Logo } from "../../components/Logo";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import LogoImage from "../../assets/img/Logo.png";
import { Title } from "./../../components/Title/index";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { Button } from "../../components/Button";
import { AntDesign } from "@expo/vector-icons";
import { Group } from "../../components/Group";
import { useEffect, useState } from "react";
import ToastManager, { Toast } from "toastify-react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Subtitle } from "../../components/Subtitle";
import api from "../../service/service";
import { ActivityIndicator } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

export const Login = ({ navigation }) => {
  //SALVAR O OBJ COM HISTORICO DE ACESSO
  const [dateHistory, setDateHistory] = useState({});

  //STATE DO SECURE INPUT
  const [secure, setSecure] = useState(true);

  //STATE DO LOADING DO BOTAO
  const [carregando, setCarregando] = useState(false);

  //FUNCAO PARA VERIFICAR SE EXISTE BIOMETRIA NO APARELHO
  async function CheckExistAuthentication() {
    LocalAuthentication.hasHardwareAsync().then((response) => {
      if (response) {
        Toast.success("Biometria disponível");
      } else {
        Toast.error("Biometria não disponível");
      }
    });
  }

  //CHECA SE EXISTE AUTENTICAÇÃO e PEGA O HISTORICO DE AUTENTICACAO MAIS RECENTE
  useEffect(() => {
    CheckExistAuthentication();

    GetHistory();
  }, []);

  //FUNCAO PARA AUTENTICAR COM BIOMETRIA
  async function HandleAuthentication() {
    //VERIFICAR SE EXISTE UMA BIOMETRIA CADASTRADA
    const biometricExist = await LocalAuthentication.isEnrolledAsync();

    //VALIDAR EXISTENCIA
    if (!biometricExist) {
      Toast.error("Biometria não cadastrada");
      return;
    }

    //CASO EXISTA
    LocalAuthentication.authenticateAsync().then((response) => {
      if (response.success) {
        Toast.success("Autenticado com sucesso");
        setTimeout(() => {
          navigation.navigate("Home");
        }, 1000);
      } else {
        Toast.error("Falha na autenticação");
      }
    });

    if (auth.success) {
      await SetHistory();
    }
  }

  //FUNCAO PARA DEFINIR O HISTORICO DE AUTENTICACAO
  async function SetHistory() {
    const objAuth = {
      dataAuthenticated: moment().format("DD/MM/YYYY HH:mm:ss"),
    };

    await AsyncStorage.setItem("authenticate", JSON.stringify(objAuth));

    setDateHistory(objAuth);
  }

  //FUNCAO PARA PEGAR O HISTORICO DE AUTENTICACAO
  async function GetHistory() {
    const objAuth = await AsyncStorage.getItem("authenticate");

    if (objAuth) {
      setDateHistory(JSON.parse(objAuth));
    }
  }

  //STATE DOS INPUTS DE LOGIN
  const [inputs, setInputs] = useState({
    email: "",
    senha: "",
  });

  //METODO LOGIN COM API
  async function Login() {
    if (inputs.email === "" || inputs.senha === "") {
      Toast.error("Preencha os campos");
    }
    //INICIA ACTIVITY INDICATOR
    setCarregando(true);
    await api
      .post("/Login", {
        email: inputs.email,
        senha: inputs.senha,
      })
      .then(async (response) => {
        //SETA O TOKEN NO ASYNC STORAGE E NAVEGA PRA MAIN
        await AsyncStorage.setItem("token", JSON.stringify(response.data));
        navigation.navigate("Main");
      })
      .catch(() => {
        Toast.error("Email ou senha incorretos");
      });
    //FINALIZA O LOADING
    setCarregando(false);
  }

  return (
    <ContainerScroll>
      <ToastManager height={60} width={300} />
      <ContainerSpacing>
        <Logo source={LogoImage} />
        <Title text={"Entrar ou criar conta"} />
        <Group gap={10}>
          <Input
            inputValue={inputs.email}
            onChangeText={(text) => setInputs({ ...inputs, email: text })}
            placeholder="E-mail"
            keyboardType="email-address"
          />
          <Input
            secureTextEntry={secure}
            inputValue={inputs.senha}
            onChangeText={(text) => setInputs({ ...inputs, senha: text })}
            placeholder="Senha"
            icon={<Entypo onPress={()=> setSecure(!secure)} name={secure ? "eye-with-line" : "eye"} size={24} color="#34898f" />}
          />
          <Link
            onPress={() => navigation.navigate("RecuperarSenha")}
            color="#8C8A97"
            align="flex-start"
            text="Esqueceu sua senha?"
          />
        </Group>
        <Group gap={10}>
          <Button
            disabled={carregando}
            onPress={() => Login()}
            text={carregando ? <ActivityIndicator /> : "Entrar"}
          />

          <Button
            onPress={() => HandleAuthentication()}
            text="Entrar com biometria"
          />

          <Button
            outlined
            onPress={() => Login()}
            text="Entrar com google"
            icon={<AntDesign name="google" size={16} color="#4D659D" />}
          />
        </Group>
        <Link
          onPress={() => navigation.navigate("CriarConta")}
          doubleColor
          text2="Não tem conta? "
          text="Crie uma agora!"
          color2="#4E4B59"
          color="#4D659D"
        />
        {dateHistory.dataAuthenticated ? (
          <Group gap={10}>
            <Subtitle bold text={"Último acesso"} />
            <Group row>
              <Subtitle text={dateHistory.dataAuthenticated} />
              <AntDesign name="check" size={20} color="#4D659D" />
            </Group>
          </Group>
        ) : null}
      </ContainerSpacing>
    </ContainerScroll>
  );
};
