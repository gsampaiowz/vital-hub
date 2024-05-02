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

  const [confirmarSenha, setConfirmarSenha] = useState('pacienteTeste')

  const [inputs, setInputs] = useState({

    nome: "",
    email: "",
    senha: "",
    cidade: "",
    logradouro: "",
    cpf: "",
    dataNascimento: "",
    numero: 10,
    cep: "",
    rg: "",
    foto: ""

  });

  const [user, setUser] = useState({})

  // function criarConta() {
  //   if (senha !== confirmarSenha) {
  //     Toast.error("As senha não são iguais")
  //     return;
  //   }
  //   navigation.navigate("Perfil", { senha: senha, email: email, nome: nome })
  // }

  async function fillProfile() {

    const formData = new FormData();

    formData.append('rg', inputs.rg);
    formData.append('cpf', inputs.cpf);
    formData.append('cep', inputs.cep);
    formData.append('logradouro', inputs.logradouro);
    formData.append('numero', inputs.numero);
    formData.append('cidade', inputs.cidade);
    formData.append('nome', inputs.nome);
    formData.append('email', inputs.email);
    // formData.append('foto', foto); // Adiciona o arquivo
    formData.append('senha', inputs.senha);
    formData.append('idTipoUsuario', "979DD35B-0C04-4D8F-8FD1-AB55D1DEC1C3");
    formData.append('dataNascimento', new Date(inputs.dataNascimento.split('/').reverse().join('-') + 'T00:00:00.000Z').toISOString());

    await api.post("/Pacientes", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });


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
          inputValue={inputs.nome}
          placeholder="Seu nome completo"
          label="Nome"
          onChangeText={(text) => setInputs({ ...inputs, nome: text })}
        />
        <Input
          inputValue={inputs.email}
          placeholder="E-mail"
          label="E-mail"
          onChangeText={(text) => setInputs({ ...inputs, email: text })}
        />
        <Input
          inputValue={inputs.senha}
          label="Senha"
          placeholder="*******"
          onChangeText={(text) => setInputs({ ...inputs, senha: text })}
        />
        <Input
          inputValue={inputs.cidade}
          label="Cidade"
          placeholder="Cidade"
          onChangeText={(text) => setInputs({ ...inputs, cidade: text })}
        />
        <Input
          inputValue={inputs.logradouro}
          label="Logradouro"
          placeholder="Logradouro"
          onChangeText={(text) => setInputs({ ...inputs, logradouro: text })}
        />
        <Input
          inputValue={inputs.dataNascimento}
          label="Data de Nascimento"
          placeholder="_ / _ / _"
          onChangeText={(text) => setInputs({ ...inputs, dataNascimento: text })}
        />
        <Group row={true}>
          <Input
            inputValue={inputs.cpf}
            placeholder="CPF"
            label="Cpf"
            onChangeText={(text) => setInputs({ ...inputs, cpf: text })}
          />
          <Input
            inputValue={inputs.numero}
            placeholder="Nº"
            label="Número"
            onChangeText={(text) => setInputs({ ...inputs, numero: text })}
          />
        </Group>
        <Group row={true}>
          <Input
            inputValue={inputs.cep}
            placeholder="CEP"
            label="Cep"
            onChangeText={(text) => setInputs({ ...inputs, cep: text })}
          />
          <Input
            inputValue={inputs.rg}
            placeholder="RG"
            label="Rg"
            onChangeText={(text) => setInputs({ ...inputs, rg: text })}
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
