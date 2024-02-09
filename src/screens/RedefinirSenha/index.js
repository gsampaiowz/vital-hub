import { AntDesign } from "@expo/vector-icons";
import { ContainerSafe } from "../../components/Container";
import { Logo } from "../../components/Logo";
import LogoImage from "../../assets/img/Logo.png";
import { Subtitle } from "./../../components/Subtitle/index";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { NavigationButton } from "../../components/NavigationButton";
import { Button } from "../../components/Button";
import { Group } from "../../components/Group/index";

export const RedefinirSenha = ({ navigation }) => {
  return (
    <ContainerSafe>
      <NavigationButton
        onPress={() => navigation.navigate("Login")}
        content={<AntDesign name="close" size={24} color="#34898f" />}
      />

      <Logo source={LogoImage} />

      <Title text={"Redefinir Senha"} />

      <Subtitle text="Insira e confirme a sua nova senha" />
      <Group gap={10}>
        <Input placeholder="Nova Senha" />
        <Input placeholder="Confirmar nova senha" />
      </Group>
      <Button onPress={() => navigation.navigate("Login")} text="Redefinir" />
    </ContainerSafe>
  );
};
