import { PacienteImage } from "../../components/PacienteImage";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDecodeToken } from "../../utils/Auth";
import api from "../../service/service";

export const Perfil = ({ navigation, route }) => {
  const [editMode, setEditMode] = useState(false);

  const [cadastro, setCadastro] = useState(false)

  const [user, setUser] = useState({});

  const [inputs, setInputs] = useState({
    dataNascimento: "02/04/2000",
    cpf: "32132132121",
    endereco: "Rua talvez sim",
    cep: "12123123",
    cidade: "Olimpia",
  });

  if (!user) {
    const senha = route.params.senha;
    const email = route.params.email;


    //função de preencher o perfil do paciente, com os dados da api
    async function fillProfile() {
      try {
        await api.post("/Pacientes", {
          rg: "3123432",
          cpf: inputs.cpf,
          cep: inputs.cep,
          logradouro: inputs.endereco,
          numero: 10,
          cidade: inputs.cidade,
          nome: "Sergio",
          email: email,
          senha: senha,
          idTipoUsuario: "979DD35B-0C04-4D8F-8FD1-AB55D1DEC1C3",
          foto: "string",
          dataNascimento: new Date(inputs.dataNascimento.split('/').reverse().join('-') + 'T00:00:00.000Z').toISOString()
        })
        console.log("Cadastrado com sucesso");
      } catch (error) {
        console.log(error);
      }
    }

  } else {

    //função de atualizar os dados do paciente
    async function updatePatient() {
      try {
        await api.put("/Pacientes?idUsuario=" + user.id, {
          rg: "3123432",
          cpf: inputs.cpf,
          logradouro: inputs.endereco,
          cep: inputs.cep,
          cidade: inputs.cidade,
          numero: 10,
          nome: "Sergio",
          idTipoUsuario: "979DD35B-0C04-4D8F-8FD1-AB55D1DEC1C3",
          foto: "string",
          dataNascimento: new Date(inputs.dataNascimento.split('/').reverse().join('-') + 'T00:00:00.000Z').toISOString()
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
    async function Logout() {
      //Remover token do AsyncStorage
      await AsyncStorage.removeItem("token");

      //Redirecionar para a tela de login
      navigation.navigate("Login");
    }
    console.log(Logout);

  useEffect(() => {
    if (cadastro === true) {

      setEditMode(true)
      setCadastro(true)
    }
    ProfileLoad();
  }, []);

  async function ProfileLoad() {
    // const token = await userDecodeToken();
    setUser(await userDecodeToken());
    // if (token !== null) {
    //   await /*função que tá chamando o userDecodeToken*/(token);
    }
  // }

  return (
    <ContainerScroll>
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
        {

        }
        <Title text={user.name} />

        <Subtitle text={user.email} />
        <Input
          inputValue={inputs.dataNascimento}
          onChange={(text) => setInputs({ ...inputs, dataNascimento: text })}
          border={editMode}
          label="Data de nascimento:"
          placeholder="04/05/1999"
        />

        <Input
          inputValue={inputs.cpf}
          onChange={(text) => setInputs({ ...inputs, cpf: text })}
          border={editMode}
          label="CPF"
          placeholder="859********"
        />

        <Input
          inputValue={inputs.endereco}
          onChange={(text) => setInputs({ ...inputs, endereco: text })}
          border={editMode}
          label="Endereço"
          placeholder="Rua Vicenso Silva, 987"
        />

        <Group gap={20} row={window.innerWidth <= 350 ? false : true}>
          <Input
            inputValue={inputs.cep}
            onChange={(text) => setInputs({ ...inputs, cep: text })}
            border={editMode}
            label="Cep"
            placeholder="06548-909"
          />

          <Input
            inputValue={inputs.cidade}
            onChange={(text) => setInputs({ ...inputs, cidade: text })}
            border={editMode}
            label="Cidade"
            placeholder="Moema-SP"
          />
        </Group>
        <Group gap={10}>
          <Button
            onPress={!user ? () => {
              
              fillProfile();
              navigation.navigate("Login")
            } : () => {

              setEditMode(!editMode)
              editMode ? updatePatient() : null
            }
            }
            text={!editMode ? "EDITAR" : cadastro ? "CADASTRAR" : "SALVAR"}

          />

          <Button
          onPress={() => Logout()} outlined text="SAIR DA CONTA" />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
