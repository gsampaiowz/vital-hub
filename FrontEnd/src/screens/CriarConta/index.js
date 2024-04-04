import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { NavigationButton } from "../../components/NavigationButton";
import { AntDesign } from "@expo/vector-icons";
import LogoImage from "../../assets/img/Logo.png";
import { Logo } from "../../components/Logo";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { Title } from "./../../components/Title";
import { Group } from "../../components/Group";
import { useState } from "react";
import ToastManager, { Toast } from "toastify-react-native";

export const CriarConta = ({ navigation }) => {

  const [email, setEmail] = useState('pacientenovo@email.com')
  const [senha, setSenha] = useState('pacientenovo')
  const [confirmarSenha, setConfirmarSenha] = useState('pacientenovo')

  function criarConta() {
    if (senha !== confirmarSenha) {
      Toast.error("As senha não são iguais")
      return;
    }
    navigation.navigate("Perfil", { senha: senha, email: email })
  }
  // console.log(senha)

  return (
    <ContainerScroll>
      <ToastManager />
      <ContainerSpacing>
        <NavigationButton
          onPress={() => navigation.navigate("Login")}
          content={<AntDesign name="close" size={24} color="#34898f" />}
        />

        <Logo source={LogoImage} />

        <Title text={"Criar Conta"} />

        <Subtitle text="Insira seu endereço de e-mail e senha para realizar seu cadastro." />

        <Group gap={10}>
          <Input
            inputValue={email}
            placeholder="Usuário ou E-mail"
            on
            onChange={text => setEmail(text)}
          />
          <Input placeholder="Senha"
            inputValue={senha}
            onChange={text => setSenha(text)}

            secureTextEntry={true}
          />
          <Input placeholder="Confirmar Senha"
            inputValue={confirmarSenha}
            onChange={text => setConfirmarSenha(text)} />
        </Group>

        <Button text="Cadastrar" onPress={() => criarConta()} />
        <Link
          doubleColor
          text2="Já possui uma conta? "
          text="Faça login"
          onPress={() => navigation.navigate("Login")}
        />
      </ContainerSpacing>
    </ContainerScroll>
  );
};
