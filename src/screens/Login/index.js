import { Logo } from "../../components/Logo";
import { Container } from "../../components/Container";
import LogoImage from "../../assets/Logo.png";
import { Title } from "./../../components/Title/index";
import { Input, InputsContainer } from "../../components/Input";
import { Link } from "../../components/Link";
import { Button } from "../../components/Button";

import { AntDesign } from "@expo/vector-icons";
import { ButtonsContainer } from "./../../components/Button/index";

export const Login = () => {
  return (
    <Container>
      <Logo source={LogoImage} />
      <Title text={"Entrar ou criar conta"} />
      <InputsContainer>
        <Input placeholder="Usuário ou E-mail" />
        <Input placeholder="Senha" />
        <Link color="#8C8A97" align="flex-start" text="Esqueceu sua senha?"/>
      </InputsContainer>
      <ButtonsContainer>
        <Button text="Entrar" />

        <Button
          outlined
          text="Entrar com google"
          icon={<AntDesign name="google" size={16} color="#4D659D" />}
        />
      </ButtonsContainer>
      <Link
        doubleColor
        text2="Não tem conta? "
        text="Crie uma agora!"
        color2="#4E4B59"
        color="#4D659D"
      />
    </Container>
  );
};
