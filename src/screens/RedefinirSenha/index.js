import { AntDesign } from "@expo/vector-icons";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Logo } from "../../components/Logo";
import LogoImage from "../../assets/img/Logo.png";
import { Subtitle } from "./../../components/Subtitle/index";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { NavigationButton } from "../../components/NavigationButton";
import { Button } from "../../components/Button";
import { Group } from "../../components/Group/index";
import { useState } from "react";
import api from "../../service/service";
import ToastManager, { Toast } from "toastify-react-native";
import Entypo from "@expo/vector-icons/Entypo";

export const RedefinirSenha = ({ navigation, route }) => {
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [secure, setSecure] = useState(true);

  // FUNÇÃO DE ALTERAR SENHA DO USUÁRIO
  async function AlterarSenha() {
    if (senha === confirmar) {
      await api
        .put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
          senhaNova: senha,
        })
        .then(() => {
          navigation.replace("Login");
        })
        .catch((error) => {
          Toast.error("Preencha os campos!");
          console.log(error);
        });
    } else {
      Toast.error("As senhas devem ser \niguais!");
    }
  }

  return (
    <ContainerScroll>
      <ToastManager height={80} width={280} />
      <ContainerSpacing>
        <NavigationButton
          onPress={() => navigation.navigate("Login")}
          content={<AntDesign name="close" size={24} color="#34898f" />}
        />

        <Logo source={LogoImage} />

        <Title text={"Redefinir Senha"} />

        <Subtitle text="Insira e confirme a sua nova senha" />
        <Group gap={10}>
          <Input
          secureTextEntry={secure}
            placeholder="Nova Senha"
            inputValue={senha}
            onChangeText={(txt) => setSenha(txt)}
            icon={
              <Entypo
                onPress={() => setSecure(!secure)}
                name={secure ? "eye-with-line" : "eye"}
                size={24}
                color="#34898f"
              />
            }
          />

          <Input
          secureTextEntry={secure}
            placeholder="Confirmar nova senha"
            inputValue={confirmar}
            onChangeText={(txt) => setConfirmar(txt)}
          />
        </Group>
        <Button onPress={() => AlterarSenha()} text="Redefinir" />
      </ContainerSpacing>
    </ContainerScroll>
  );
};
