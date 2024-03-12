import { Logo } from "../../components/Logo";
import { Title } from "../../components/Title";
import LogoImage from "../../assets/img/Logo.png";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Subtitle } from "./../../components/Subtitle/index";
import { Input } from "./../../components/Input/index";
import { Button } from "./../../components/Button/index";
import { NavigationButton } from "./../../components/NavigationButton/index";
import { AntDesign } from "@expo/vector-icons";

export const RecuperarSenha = ({ navigation }) => {
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
        <Input placeholder="Usuário ou E-mail" />
        <Button
          onPress={() => navigation.navigate("VerificarEmail")}
          text="Continuar"
        />
      </ContainerSpacing>
    </ContainerScroll>
  );
};
