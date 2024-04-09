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
import { useEffect, useState } from "react";
import ToastManager, { Toast } from "toastify-react-native";
import { userDecodeToken } from "../../utils/Auth";
import api from "../../service/service";

export const CriarConta = ({ navigation }) => {

  const [nome, setNome] = useState('Carlos')
  const [email, setEmail] = useState('pacienteTeste@gmail.com')
  const [senha, setSenha] = useState('pacienteTeste')
  const [cidade, setCidade] = useState('Moema')
  const [logradouro, setLogradouro] = useState('Rua Vicenso Silva')
  const [cpf, setCpf] = useState('39294770095')
  const [dataNascimento, setDataNascimento] = useState('04/05/1999')
  const [numero, setNumero] = useState('10')
  const [cep, setCep] = useState('06548-909')
  const [rg, setRg] = useState('351763053')
  const [foto, setFoto] = useState('string')
  const [confirmarSenha, setConfirmarSenha] = useState('pacienteTeste')

  const [user, setUser] = useState({})

  // function criarConta() {
  //   if (senha !== confirmarSenha) {
  //     Toast.error("As senha não são iguais")
  //     return;
  //   }
  //   navigation.navigate("Perfil", { senha: senha, email: email, nome: nome })
  // }

  async function fillProfile() {
    try {
      await api.post("/Pacientes", {
        rg,
        cpf,
        cep,
        logradouro,
        numero,
        cidade,
        nome,
        email,
        senha,
        idTipoUsuario: "979DD35B-0C04-4D8F-8FD1-AB55D1DEC1C3",
        foto,
        dataNascimento: new Date(dataNascimento.split('/').reverse().join('-') + 'T00:00:00.000Z').toISOString(),
        // dataNascimento: 
      })
      // console.log("Cadastrado com sucesso");
    } catch (error) {
      console.log(error);
    }
  }

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
            inputValue={nome}
            placeholder="Sampaio"
            label="Nome"
            onChange={text => setNome(text)}
          />
          <Input
            inputValue={email}
            placeholder="sampaio@gmail.com"
            label="E-mail"
            onChange={text => setEmail(text)}
          />
          <Input
            inputValue={senha}
            label="Senha"
            placeholder="*******"
            onChange={text => setSenha(text)}
          />
          <Input
            inputValue={cidade}
            label="Cidade"
            placeholder="São Paulo"
            onChange={text => setCidade(text)}
          />
          <Input
            inputValue={logradouro}
            label="Logradouro"
            placeholder="Rua Itambém"
            onChange={text => setLogradouro(text)}
          />
          <Input
            inputValue={dataNascimento}
            placeholder="12/03/2000"
            label="Data de Nascimento"
            onChange={text => setDataNascimento(text)}
          />
          <Group row={true}>
            <Input
              inputValue={cpf}
              placeholder="12345678912"
              label="Cpf"
              onChange={text => setCpf(text)}
            />
            <Input
              inputValue={numero}
              placeholder="22"
              label="Número"
              onChange={text => setNumero(text)}
            />
          </Group>
          <Group row={true}>
            <Input
              inputValue={cep}
              placeholder="85020250"
              label="Cep"
              onChange={text => setCep(text)}
            />
            <Input
              inputValue={rg}
              placeholder="412487214"
              label="Rg"
              onChange={text => setRg(text)}
            />
          </Group>
        </Group>
        <Button text="Cadastrar" onPress={() => fillProfile()} />
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
