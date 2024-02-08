import { AntDesign } from "@expo/vector-icons";
import { NavigationButton } from "../../components/NavigationButton";
import { Container } from "../../components/Container";
import { Subtitle } from "../../components/Subtitle";
import { Title } from "../../components/Title";
import LogoImage from "../../assets/Logo.png";
import { Logo } from "../../components/Logo";
import { Input, InputsRow } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "./../../components/Link/index";

export const VerificarEmail = ({navigation}) => {

  return (
    <Container>
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

      <InputsRow>
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
      </InputsRow>
      <Button text="Entrar" />
      <Link color="#344F8F" text="Reenviar código" />
    </Container>
  );
};
