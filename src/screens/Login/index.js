import { Logo } from "../../components/Logo";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import LogoImage from "../../assets/img/Logo.png";
import { Title } from "./../../components/Title/index";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { Button } from "../../components/Button";
import { AntDesign } from "@expo/vector-icons";
import { Group } from "../../components/Group";
import { useContext, useState } from "react";
import { userContext } from "../../../App";
import ToastManager, { Toast } from "toastify-react-native";

export const Login = ({ navigation }) => {
  const { users } = useContext(userContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  async function Login() {
    const user = users.find(
      (user) => user.email === inputs.email && user.password === inputs.password
    );

    if (!user) {
      Toast.error("Usuário ou senha inválidos");
    } else {
      Toast.success("Login efetuado com sucesso");
      navigation.navigate("Main");
    }
  }

  return (
    <ContainerScroll>
      <ToastManager />
      <ContainerSpacing>
        <Logo source={LogoImage} />
        <Title text={"Entrar ou criar conta"} />
        <Group gap={10}>
          <Input
            inputValue={inputs.email}
            onChange={(text) => setInputs({ ...inputs, email: text })}
            placeholder="Usuário ou E-mail"
          />
          <Input
            inputValue={inputs.password}
            onChange={(text) => setInputs({ ...inputs, password: text })}
            placeholder="Senha"
          />
          <Link
            onPress={() => navigation.navigate("RecuperarSenha")}
            color="#8C8A97"
            align="flex-start"
            text="Esqueceu sua senha?"
          />
        </Group>
        <Group gap={10}>
          <Button onPress={() => Login()} text="Entrar" />

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
      </ContainerSpacing>
    </ContainerScroll>
  );
};
