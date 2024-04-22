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

    nome: "Daniel",
    email: "pacienteTeste@gmail.com",
    senha: "pacienteTest",
    cidade: "Moema",
    logradouro: "Moema",
    cpf: "39294770095",
    dataNascimento: "04/05/1999",
    numero: 10,
    cep: "06548-909",
    rg: "351763053",
    foto: "String"

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
    formData.append('nome', inputs.name);
    formData.append('email', inputs.email);
    formData.append('foto', foto); // Adiciona o arquivo
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
      
      console.log(response.data);
      
  }

  // async function updateProfile() {
  //   try {
  //     await api.put("/Pacientes" + user.id, {
  //         rg: "3123432",
  //         cpf: inputs.cpf,
  //         logradouro: inputs.endereco,
  //         cep: inputs.cep,
  //         cidade: inputs.cidade,
  //         numero: 10,
  //         nome: "Sergio",
  //         idTipoUsuario: "979DD35B-0C04-4D8F-8FD1-AB55D1DEC1C3",
  //         foto: "string",
  //         dataNascimento: new Date(dataNascimento.split('/').reverse().join('-') + 'T00:00:00.000Z').toISOString()
  //     })

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


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
            placeholder="Sampaio"
            label="Nome"
            onChange={(text) => setInputs({ ...inputs, nome: text })}
          />
          <Input
            inputValue={inputs.email}
            placeholder="sampaio@gmail.com"
            label="E-mail"
            onChange={(text) => setInputs({ ...inputs, email: text })}
          />
          <Input
            inputValue={inputs.senha}
            label="Senha"
            placeholder="*******"
            onChange={(text) => setInputs({ ...inputs, senha: text })}
          />
          <Input
            inputValue={inputs.foto}
            placeholder="Foto De Perfil"
            label="Foto"
            onChange={(text) => setInputs({ ...inputs, foto: text })}
          />
          <Input
            inputValue={inputs.cidade}
            label="Cidade"
            placeholder="São Paulo"
            onChange={(text) => setInputs({ ...inputs, cidade: text })}
          />
          <Input
            inputValue={inputs.logradouro}
            label="Logradouro"
            placeholder="Rua Itambém"
            onChange={(text) => setInputs({ ...inputs, logradouro: text })}
          />
          <Input
            inputValue={inputs.dataNascimento}
            placeholder="12/03/2000"
            label="Data de Nascimento"
            onChange={(text) => setInputs({ ...inputs, dataNascimento: text })}
          />
          <Group row={true}>
            <Input
              inputValue={inputs.cpf}
              placeholder="12345678912"
              label="Cpf"
              onChange={(text) => setInputs({ ...inputs, cpf: text })}
            />
            <Input
              inputValue={inputs.numero}
              placeholder="22"
              label="Número"
              onChange={(text) => setInputs({ ...inputs, numero: text })}
            />
          </Group>
          <Group row={true}>
            <Input
              inputValue={inputs.cep}
              placeholder="85020250"
              label="Cep"
              onChange={(text) => setInputs({ ...inputs, cep: text })}
            />
            <Input
              inputValue={inputs.rg}
              placeholder="412487214"
              label="Rg"
              onChange={(text) => setInputs({ ...inputs, rg: text })}
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
