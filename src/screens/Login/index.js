import { Logo } from "../../components/Logo";
import { Container } from "../../components/Container";
import LogoImage from "../../assets/Logo.png";
import { Title } from "./../../components/Title/index";
import { Input, InputsContainer } from "../../components/Input";
import {
  Link,
  LinkCadastro,
  LinkCadastroContainer,
} from "../../components/Link";
import { Button, GoogleButton } from "../../components/Button";

import { AntDesign } from "@expo/vector-icons";

export const Login = () => {
  return (
    <Container>
      <Logo source={LogoImage} />
      <Title>Entrar ou criar conta</Title>
      <InputsContainer>
        <Input placeholder="Usuário ou E-mail" />
        <Input placeholder="Senha" />
        <Link>Esqueceu sua senha?</Link>
      </InputsContainer>
      <Button>Entrar</Button>
      <GoogleButton>
        <AntDesign name="google" size={16} color="#4D659D" />
        Entrar com google
      </GoogleButton>
      <LinkCadastroContainer>
        Não tem conta?
        <LinkCadastro>Crie uma conta agora!</LinkCadastro>
      </LinkCadastroContainer>
    </Container>
  );
};
