import { ContainerSafe } from "../../components/Container";
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

export const CriarConta = ({ navigation }) => {
  return (
    <ContainerSafe>
      <NavigationButton
        onPress={() => navigation.navigate("Login")}
        content={<AntDesign name="close" size={24} color="#34898f" />}
      />

      <Logo source={LogoImage} />

      <Title text={"Criar Conta"} />

      <Subtitle text="Insira seu endereço de e-mail e senha para realizar seu cadastro." />

      <Group gap={10}>
        <Input placeholder="Usuário ou E-mail" />
        <Input placeholder="Senha" />
        <Input placeholder="Confirmar Senha" />
      </Group>

      <Button text="Cadastrar" onPress={() => navigation.navigate("Login")} />
      <Link
        doubleColor
        text2="Já possui uma conta? "
        text="Faça login"
        onPress={() => navigation.navigate("Login")}
      />
    </ContainerSafe>
  );
};
