import { Logo } from "../../components/Logo";
import { Title } from "../../components/Title";
import LogoImage from "../../assets/img/Logo.png";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Subtitle } from "./../../components/Subtitle/index";
import { Input } from "./../../components/Input/index";
import { Button } from "./../../components/Button/index";
import { NavigationButton } from "./../../components/NavigationButton/index";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import api from "../../service/service";
import { ActivityIndicator } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";

export const RecuperarSenha = ({ navigation }) => {

  const [email, setEmail] = useState('thiagorafael2005@gmail.com')

  const [carregando, setCarregando] = useState(false);

    // REQUISIÇÃO PARA CADASTRAR UM USUÁRIO NOVO
  async function CheckExistAuthentication() {
    LocalAuthentication.hasHardwareAsync().then((response) => {
      if (response) {
        Toast.success("Senha alterada");
      } else {
        Toast.error("Preencha todos os campos");
      }
    });
  }

  // REQUISIÇÃO PARA RECUPERAR SENHA
  async function EnviarEmail() {


    setCarregando(true)
    await api.post(`/RecuperarSenha?email=${email}`)
      .then(() => {

        navigation.replace("VerificarEmail", { emailRecuperacao: email })

      }).catch(error => {
        console.log(error);
      })

    Toast.error("Campos inválido")
    setCarregando(false)
  }

  return (
    <ContainerScroll>
      <ToastManager height={60} width={300} />
      <ContainerSpacing>
        <NavigationButton
          onPress={() => navigation.navigate("Login")}
          content={<AntDesign name="arrowleft" size={24} color="#34898f" />}
        />
        <Logo source={LogoImage} />
        <Title text={"Recuperar senha"} />
        <Subtitle
          text={
            "Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha"
          }

        />
        <Input
          inputValue={email}
          placeholder="Usuário ou E-mail"
          onChangeText={(txt) => setEmail(txt)}
        />
        <Button
          onPress={() => EnviarEmail()}
          disabled={carregando}
          text={carregando ? <ActivityIndicator /> : "Continuar"}
        />
      </ContainerSpacing>
    </ContainerScroll>
  );
};
