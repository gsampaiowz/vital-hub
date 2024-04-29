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

  const [cadastro, setCadastro] = useState(false)

  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [photo, setPhoto] = useState(null);

  const [id, setId] = useState('')

  const [inputs, setInputs] = useState({
    nome: "",
    cidade: "",
    logradouro: "",
    cpf: "",
    dataNascimento: "",
    numero: "",
    cep: "",
    rg: "",
    foto: "",
    crm: ""
  });

// console.log(inputs.numero);

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
          nome: response.data.idNavigation.nome,
          cidade: response.data.endereco.cidade,
          logradouro: response.data.endereco.logradouro,
          dataNascimento:new Date (response.data.dataNascimento).toLocaleDateString(),
          cpf: response.data.cpf,
          numero: response.data.endereco.numero,
          cep: response.data.endereco.cep,
          rg: response.data.rg,
        })
      } else {
        setInputs({
          nome: response.data.idNavigation.nome,
          cep: response.data.endereco.cep,
          logradouro: response.data.endereco.logradouro,
          numero: response.data.endereco.numero,
          cidade: response.data.endereco.cidade,
          crm: response.data.crm,
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

  useEffect(() => {
    if (cadastro === true) {

      setEditMode(true)
      setCadastro(true)
    }
    ProfileLoad();
  }, []);

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

  // `/Pacientes?idUsuario=${user.id}`


//mockei pra testar, mas não deu certo
  async function updateProfile() {
    await api.put(`/Medicos/BuscarPorId?Id=9613B1DB-AE57-4A10-8155-23ADE85DF060`, {
    })
      .then(response => {

        if (user.role === "paciente") {
          setInputs({
            nome: response.data.idNavigation.nome,
            cidade: response.data.endereco.cidade,
            logradouro: response.data.endereco.logradouro,
            dataNascimento:new Date (response.data.dataNascimento).split('/').reverse().join('-').toLocaleString(),
            cpf: response.data.cpf,
            numero: response.data.endereco.numero,
            cep: response.data.endereco.cep,
            rg: response.data.rg,
          })
        } else {
          setInputs({
            nome: response.data.idNavigation.nome,
            cep: response.data.endereco.cep,
            logradouro: response.data.endereco.logradouro,
            numero: response.data.endereco.numero,
            cidade: response.data.endereco.cidade,
            crm: response.data.crm,
          });
        }
      })
      .catch(error => {
        console.error(error.respose.data);

      });
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
                inputValue={inputs.numero.toString()}
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
          </>
        ) : (
          <>
            <Input
              inputValue={inputs.nome}
              onChangeText={(text) => setInputs({ ...inputs, nome: text })}
              border={editMode}
              label="Nome"
              placeholder="Sampaio"
            />
            {/* <Input
              inputValue={inputs.cidade}
              onChangeText={(text) => setInputs({ ...inputs, cidade: text })}
              border={editMode}
              label="Cidade"
              placeholder="São Paulo"
            /> */}
            <Input
              inputValue={inputs.logradouro}
              onChangeText={(text) => setInputs({ ...inputs, logradouro: text })}
              border={editMode}
              label="Logradouro"
              placeholder="Rua Itambé"
            />
              <Input
                inputValue={inputs.numero.toString()}
                onChangeText={(text) => setInputs({ ...inputs, numero: text })}
                border={editMode}
                label="Número"
                placeholder="22"
              />
              
            <Group gap={20} row={window.innerWidth <= 350 ? false : true}>
              <Input
                inputValue={inputs.cep}
                onChangeText={(text) => setInputs({ ...inputs, cep: text })}
                border={editMode}
                label="Cep"
                placeholder="06548-909"
              />
              <Input
                inputValue={inputs.crm}
                onChangeText={(text) => setInputs({ ...inputs, crm: text })}
                border={editMode}
                label="CRM"
                placeholder="123456"
              />
            </Group>
          </>
        )}

        <Group gap={10}>
          {/* <Button
            onPress={() => setEditMode(!editMode)}
            text={editMode ? "SALVAR" : "EDITAR"}
          /> */}

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
};
