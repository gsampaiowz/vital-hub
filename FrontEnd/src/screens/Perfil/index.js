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

export const Perfil = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false);

  const [inputs, setInputs] = useState({
    dataNascimento: "",
    cpf: "",
    endereco: "",
    cep: "",
    cidade: "",
  });

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
            onPress={() => setEditMode(!editMode)}
            text={editMode ? "SALVAR" : "EDITAR"}
          />

          <Button onPress={() => Logout()} outlined text="SAIR DA CONTA" />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
