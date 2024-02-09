import { Logo } from "../../components/Logo";
import { ContainerSafe } from "../../components/Container";
import LogoImage from "../../assets/img/Logo.png";
import { Title } from "./../../components/Title/index";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { Button } from "../../components/Button";

import { AntDesign } from "@expo/vector-icons";
import { Group } from "../../components/Group";

export const Login = ({ navigation }) => {
  return (
    <ContainerSafe>
      <Logo source={LogoImage} />
      <Title text={"Entrar ou criar conta"} />
      <Group gap={10}>
        <Input placeholder="Usuário ou E-mail" />
        <Input placeholder="Senha" />
        <Link
          onPress={() => navigation.navigate("RecuperarSenha")}
          color="#8C8A97"
          align="flex-start"
          text="Esqueceu sua senha?"
        />
      </Group>
      <Group gap={10}>
        <Button text="Entrar" />

        <Button
          outlined
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
    </ContainerSafe>
  );
};
