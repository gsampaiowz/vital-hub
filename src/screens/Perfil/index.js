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

    nome: "Daniel",
    cidade: "Moema",
    logradouro: "Rua Vicenso Silva",
    cpf: "39294770095",
    dataNascimento: "04/05/1999",
    numero: 10,
    cep: "06548-909",
    rg: "351763053",
    foto: "String"

  });

  //função de atualizar os dados do paciente

  async function Logout() {
    //Remover token do AsyncStorage
    await AsyncStorage.removeItem("token");

    //Redirecionar para a tela de login
    navigation.navigate("Login");
  }
  // console.log(Logout);

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

  async function updateProfile() {

    const formData = new FormData();
    
    formData.append('rg', inputs.rg);
    formData.append('cpf', inputs.cpf);
    formData.append('cep', inputs.cep);
    formData.append('logradouro', inputs.logradouro);
    formData.append('numero', inputs.numero);
    formData.append('cidade', inputs.cidade);
    formData.append('nome', inputs.nome);
    // formData.append('foto', foto); // Adiciona o arquivo
    formData.append('idTipoUsuario', "979DD35B-0C04-4D8F-8FD1-AB55D1DEC1C3");
    formData.append('dataNascimento', new Date(inputs.dataNascimento.split('/').reverse().join('-') + 'T00:00:00.000Z').toISOString());
    
    await api.put("/Pacientes/BuscarPorId" + user.id, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // console.log("testers")
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <ContainerScroll>
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />
      <ContainerSpacing>
        {

        }
        <Title text={user.name} />

        <Subtitle text={user.email} />

        <Input
          inputValue={inputs.nome}
          onChangeText={(text) => setInputs({ ...inputs, nome: text })}
          border={editMode}
          label="Nome"
          placeholder="Sampaio"
        />
        <Input
          inputValue={inputs.cidade}
          onChangeText={(text) => setInputs({ ...inputs, cidade: text })}
          border={editMode}
          label="Cidade"
          placeholder="São Paulo"
        />
        <Input
          inputValue={inputs.logradouro}
          onChangeText={(text) => setInputs({ ...inputs, logradouro: text })}
          border={editMode}
          label="Logradouro"
          placeholder="Rua Itambé"
        />
        <Input
          inputValue={inputs.dataNascimento}
          onChangeText={(text) => setInputs({ ...inputs, dataNascimento: text })}
          border={editMode}
          label="Data de nascimento:"
          placeholder="04/05/1999"
        />
        <Group row={true}>

          <Input
            inputValue={inputs.cpf}
            onChangeText={(text) => setInputs({ ...inputs, cpf: text })}
            border={editMode}
            label="CPF"
            placeholder="859********"
          />

          <Input
            inputValue={inputs.numero}
            onChangeText={(text) => setInputs({ ...inputs, numero: text })}
            border={editMode}
            label="Número"
            placeholder="22"
          />
        </Group>
        <Group gap={20} row={window.innerWidth <= 350 ? false : true}>
          <Input
            inputValue={inputs.cep}
            onChangeText={(text) => setInputs({ ...inputs, cep: text })}
            border={editMode}
            label="Cep"
            placeholder="06548-909"
          />

          <Input
            inputValue={inputs.rg}
            onChangeText={(text) => setInputs({ ...inputs, rg: text })}
            border={editMode}
            label="Rg"
            placeholder="412487214"
          />
        </Group>
        <Group gap={10}>
          <Button
            onPress={!user ? () => {

              fillProfile();
              navigation.navigate("Login")
            } : () => {

              setEditMode(!editMode)
              editMode ? updateProfile() : null
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
}
