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

export const RecuperarSenha = ({ navigation }) => {
  
  const [email, setEmail] = useState('medico2@email.com')
  
  const [carregando, setCarregando] = useState(false);

  // Requisição para recuperar senha 
  async function EnviarEmail() {
    setCarregando(true)
    await api.post(`/RecuperarSenha?email=${email}`)
      .then(() => {

        navigation.replace("VerificarEmail", { emailRecuperacao: email })

      }).catch(error => {
        console.log(error);
      })
    setCarregando(false)
  }

  return (
    <ContainerScroll>
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
