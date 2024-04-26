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
import { styled } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { MyCamera } from "../../components/MyCamera/index";
import api from "../../service/service";
import { ActivityIndicator, Dimensions } from "react-native";

const ButtonCamera = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #fbfbfb;
  background-color: #496bba;
  position: absolute;
  right: 15px;
  bottom: -20px;
`;

const ButtonConfirm = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #fbfbfb;
  background-color: green;
  position: absolute;
  left: 15px;
  bottom: -20px;
`;

const ButtonCancel = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #fbfbfb;
  background-color: red;
  position: absolute;
  left: 75px;
  bottom: -20px;
`;

const screenWidth = Dimensions.get("window").width;

export const Perfil = ({ navigation }) => {
  const [showCamera, setShowCamera] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [photo, setPhoto] = useState(null);

  const [inputs, setInputs] = useState({
    crm: "",
    dataNascimento: "",
    cpf: "",
    numero: "",
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

  async function BuscarPorId() {
    const url = user.role === "paciente" ? "Pacientes" : "Medicos";
    try {
      const response = await api.get(`/${url}/BuscarPorId?id=${user.id}`);
      console.log(response.data);

      if (user.role === "paciente") {
        setInputs({
          dataNascimento: response.data.dataNascimento,
          cpf: response.data.cpf,
          cep: response.data.endereco.cep,
          endereco: response.data.endereco.logradouro,
          numero: response.data.endereco.numero,
          cidade: response.data.endereco.cidade,
        });
      } else {
        setInputs({
          crm: response.data.crm,
          cep: response.data.endereco.cep,
          endereco: response.data.endereco.logradouro,
          numero: response.data.endereco.numero,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function requestGaleria() {
    await MediaLibrary.requestPermissionsAsync();

    await ImagePicker.requestMediaLibraryPermissionsAsync();
  }
  
  async function ProfileLoad() {
    try {
      const decodedUser = await userDecodeToken();
      setUser({
        ...decodedUser,
      });
    } catch (error) {
      console.error("Error decoding token or setting user:", error);
    }
  }

  useEffect(() => {
    ProfileLoad();
    requestGaleria();
  }, []);

  useEffect(() => {
    BuscarPorId();
  }, [user]);

  async function AlterarFotoPerfil() {
    setLoadingPhoto(true);
    const formData = new FormData();

    formData.append("Arquivo", {
      name: `image.${photo.split(".")[1]}`,
      type: `image/${photo.split(".")[1]}`,
      uri: photo,
    });

    try {
      await api.put(`/Usuario/AlterarFotoPerfil?id=${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      ProfileLoad();
      setPhoto(null);
      setLoadingPhoto(false);
    } catch (error) {
      console.log(error);
    }
  }

  return showCamera ? (
    <MyCamera
      setModalOpen={setModalOpen}
      setPhoto={setPhoto}
      getMediaLibrary={true}
      inCamera={showCamera}
      setInCamera={setShowCamera}
    />
  ) : (
    <ContainerScroll>
      <Group>
        {loadingPhoto == true ? (
          <ActivityIndicator style={{ height: screenWidth }} />
        ) : (
          <PacienteImage source={{ uri: photo != null ? photo : user.foto }} />
        )}
        {photo != null && loadingPhoto == false ? (
          <>
            <ButtonConfirm onPress={() => AlterarFotoPerfil()}>
              <MaterialCommunityIcons name="check" size={24} color="white" />
            </ButtonConfirm>
            <ButtonCancel onPress={() => setPhoto(null)}>
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </ButtonCancel>
          </>
        ) : null}
        <ButtonCamera onPress={() => setShowCamera(true)}>
          <MaterialCommunityIcons name="camera-plus" size={24} color="white" />
        </ButtonCamera>
      </Group>
      <ContainerSpacing>
        <Title text={user.name} />

        <Subtitle text={user.email} />

        {user.role === "paciente" ? (
          <>
            <Input
              inputValue={new Date(inputs.dataNascimento).toLocaleDateString()}
              onChange={(text) =>
                setInputs({ ...inputs, dataNascimento: text })
              }
              border={editMode}
              label="Data de nascimento:"
              placeholder="04/05/1999"
            />

            <Input
              inputValue={inputs.cpf}
              onChange={(text) => setInputs({ ...inputs, cpf: text })}
              border={editMode}
              label="CPF:"
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
          </>
        ) : (
          <>
            <Group gap={20} row={window.innerWidth <= 350 ? false : true}>
              <Input
                inputValue={inputs.crm}
                onChange={(text) => setInputs({ ...inputs, crm: text })}
                border={editMode}
                label="CRM:"
                placeholder="04/05/1999"
              />
              <Input
                inputValue={inputs.cep}
                onChange={(text) => setInputs({ ...inputs, cep: text })}
                border={editMode}
                label="CEP:"
                placeholder="04/05/1999"
              />
            </Group>
            <Input
              inputValue={inputs.numero.toString()}
              onChange={(text) => setInputs({ ...inputs, numero: text })}
              border={editMode}
              label="Número:"
              placeholder="04/05/1999"
            />
            <Input
              inputValue={inputs.endereco}
              onChange={(text) => setInputs({ ...inputs, endereco: text })}
              border={editMode}
              label="Logradouro:"
              placeholder="04/05/1999"
            />
          </>
        )}
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
