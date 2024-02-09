import { AntDesign } from "@expo/vector-icons";
import { NavigationButton } from "../../components/NavigationButton";
import { ContainerSafe } from "../../components/Container";
import { Subtitle } from "../../components/Subtitle";
import { Title } from "../../components/Title";
import LogoImage from "../../assets/img/Logo.png";
import { Logo } from "../../components/Logo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "./../../components/Link/index";
import { Group } from "../../components/Group";

export const VerificarEmail = ({navigation}) => {

  return (
    <ContainerSafe>
      <NavigationButton
        onPress={() => navigation.navigate("Login")}
        content={<AntDesign name="close" size={24} color="#34898f" />}
      />

      <Logo source={LogoImage} />

      <Title text={"Verificar Email"} />

      <Subtitle
        text={
          <>
            <Subtitle text="Digite o código de 4 dígitos enviado para" />
            <Link
              underline={false}
              color="#496BBA"
              text=" username@email.com"
            />
          </>
        }
      />

      <Group row justifyContent="space-between">
        <Input
          textAlign={"center"}
          width={60}
          height={60}
          fontSize={32}
          placeholder="0"
        />

        <Input
          textAlign={"center"}
          width={60}
          height={60}
          fontSize={32}
          placeholder="0"
        />

        <Input
          textAlign={"center"}
          width={60}
          height={60}
          fontSize={32}
          placeholder="0"
        />

        <Input
          textAlign={"center"}
          width={60}
          height={60}
          fontSize={32}
          placeholder="0"
        />
      </Group>
      <Button onPress={() => navigation.navigate("RedefinirSenha")} text="Continuar" />
      <Link color="#344F8F" text="Reenviar código" />
    </ContainerSafe>
  );
};
