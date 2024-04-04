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
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-web";
import api from "../../service/service";

export const Perfil = ({ navigation, route }) => {
  const [editMode, setEditMode] = useState(true);

  const [inputs, setInputs] = useState({
    dataNascimento: "02/04/2000",
    cpf: "32132132121",
    endereco: "Rua talvez sim",
    cep: "12123123",
    cidade: "Olimpia",
  });

  const senha = route.params.senha;
  const email = route.params.email;

  // arrumar o metodo de poste

  async function fillProfile() {
    try {
      await api.post("/Pacientes", {
        rg: "3123432",
        cpf: inputs.cpf,
        logradouro: inputs.endereco,
        cep: inputs.cep,
        cidade: inputs.cidade,
        numero: 10,
        nome: "Sergio",
        email: email,
        senha: senha,
        idTipoUsuario: "979DD35B-0C04-4D8F-8FD1-AB55D1DEC1C3",
        foto: "string",
        dataNascimento: new Date(inputs.dataNascimento.split('/').reverse().join('-') + 'T00:00:00.000Z').toISOString()
      })

      console.log("foi");
    } catch (error) {
      console.log(error);
    }
  }

  async function Logout() {
    //Remover token do AsyncStorage
    await AsyncStorage.removeItem("token");

    //Redirecionar para a tela de login
    navigation.navigate("Login");
  }

  const [user, setUser] = useState({});

  useEffect(() => {
    async function ProfileLoad() {
      setUser(await userDecodeToken());
    }
    ProfileLoad();
  }, []);

  return (
    <ContainerScroll>
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
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
            onPress={() => {
              fillProfile();
              // setEditMode(!editMode)
            }
            }
            text={editMode ? "SALVAR" : "EDITAR"}

          />

          <Button onPress={() => Logout()} outlined text="SAIR DA CONTA" />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
