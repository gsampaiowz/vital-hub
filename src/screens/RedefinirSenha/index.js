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

export const RedefinirSenha = ({ navigation, route }) => {

  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  //#endregion

  async function AlterarSenha() {
    if (senha === confirmar) {

      await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
        senhaNova: senha
      }).then(() => {
        navigation.replace("Login")
      }).catch(error => {
        console.log(error);
      })
    } else {
      alert("Senhas incompátiveis")
    }

  }

  return (
    <ContainerScroll>
      <ContainerSpacing>
        <NavigationButton
          onPress={() => navigation.navigate("Login")}
          content={<AntDesign name="close" size={24} color="#34898f" />}
        />

        <Logo source={LogoImage} />

        <Title text={"Redefinir Senha"} />

        <Subtitle text="Insira e confirme a sua nova senha" />
        <Group gap={10}>

          <Input placeholder="Nova Senha"
            onChangeText={(txt) => setSenha(txt)}

          />

          <Input placeholder="Confirmar nova senha"
            onChangeText={(txt) => setConfirmar(txt)}

          />

        </Group>
        <Button /*onPress={() => navigation.navigate("Login")} text="Redefinir"*/
          onPress={() => AlterarSenha()}
        />
      </ContainerSpacing>
    </ContainerScroll>
  );
};
