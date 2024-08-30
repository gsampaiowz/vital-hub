import { PacienteImage } from "../../components/PacienteImage";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDecodeToken } from "../../utils/Auth";
import { styled } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { MyCamera } from "../../components/MyCamera/index";
import api from "../../service/service";
import { ActivityIndicator, Dimensions } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { ModalSairConta } from "../../components/ModalSairConta";
import { Masks, useMaskedInputProps } from "react-native-mask-input";

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
  //STATE PARA ABRIR CAMERA
  const [showCamera, setShowCamera] = useState(false);

  //STATE PARA MODO DE EDITAR
  const [editMode, setEditMode] = useState(false);

  //STATE DE CARREGAR A FOTO APOS ALTERAR
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  //STATE PARA ABRIR MODAL DE LOGOFF
  const [showModalSairConta, setShowModalSairConta] = useState(false);

  //SETSTATE DO MODAL DE FOTO TIRADA
  const [, setModalOpen] = useState(false);

  //STATE DA FOTO NA CAMERA
  const [photo, setPhoto] = useState(null);

  //STATE DOS INPUTS
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
    crm: "",
  });

  const dataMasked = useMaskedInputProps({
    value: inputs.dataNascimento,
    onChangeText: (data) => setInputs({ ...inputs, dataNascimento: data }),
    mask: Masks.DATE_DDMMYYYY,
  });

  const cpfMasked = useMaskedInputProps({
    value: inputs.cpf,
    onChangeText: (txt) => setInputs({ ...inputs, cpf: txt }),
    mask: Masks.BRL_CPF,
  });

  // FUNÇÃO QUE DESLOGA DA CONTA DO USUÁRIO
  async function Logout() {
    //Remover token do AsyncStorage
    await AsyncStorage.removeItem("token");

    //Redirecionar para a tela de login
    navigation.navigate("Login");
  }

  //STATE DO USER (TOKEN)
  const [user, setUser] = useState({});

  // FUNÇÃO QUE BUSCA PELO ID DO USUÁRIO
  async function BuscarPorId() {
    //DEFINE A ROTA DA API DE ACORDO COM A ROLE
    const thisUser = await userDecodeToken();
    const url = thisUser.role === "paciente" ? "Pacientes" : "Medicos";
    try {
      const response = await api.get(`/${url}/BuscarPorId?id=${thisUser.id}`);

      //SETA OS CAMPOS DE ACORDO COM A ROLE
      if (thisUser.role === "paciente") {
        setInputs({
          nome: response.data.idNavigation.nome,
          cidade: response.data.endereco.cidade,
          logradouro: response.data.endereco.logradouro,
          dataNascimento: new Date(
            response.data.dataNascimento
          ).toLocaleDateString(),
          cpf: response.data.cpf,
          foto: response.data.idNavigation.foto,
          numero: response.data.endereco.numero,
          cep: response.data.endereco.cep,
          rg: response.data.rg,
        });
      } else {
        setInputs({
          nome: response.data.idNavigation.nome,
          cep: response.data.endereco.cep,
          logradouro: response.data.endereco.logradouro,
          numero: response.data.endereco.numero,
          foto: response.data.idNavigation.foto,
          cidade: response.data.endereco.cidade,
          crm: response.data.crm,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // FUNÇÃO QUE PEGA IMAGEM DA GALERIA
  async function requestGaleria() {
    await MediaLibrary.requestPermissionsAsync();

    await ImagePicker.requestMediaLibraryPermissionsAsync();
  }

  // FUNÇÃO QUE CARREGA O TOKEN
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

  //CARREGA USER E PERMITE A GALERIA (SE NÃO TIVER PERMISSÃO)
  useEffect(() => {
    ProfileLoad();
    requestGaleria();
  }, []);

  // BUSCA POR ID DO USUÁRIO SEMPRE QUE TROCAR A FOTO
  useEffect(() => {
    BuscarPorId();
  }, [loadingPhoto]);

  // FUNÇÃO DE ALTERAR FOTO DO PERFIL
  async function AlterarFotoPerfil() {
    //INICIA LOADING
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

      //ATUALIZA O PERFIL
      ProfileLoad();
      //ESVAZIA O STATE DA FOTO
      setPhoto(null);
      //FINALIZA LOADING
      setLoadingPhoto(false);
    } catch (error) {
      console.log(error);
    }
  }

  const scrollViewRef = useRef(null);

  // FUNÇÃO PARA ATUALIZAR O PERFIL
  async function updateProfile() {
    //VERIFICA SE EXISTE ALGUM INPUT VAZIO
    if (Object.values(inputs).some((input) => input === "")) {
      //EXIBE UM TOAST E VAI NO TOPO DA TELA
      Toast.error("Campo Vazio ou Inválido");

      scrollViewRef.current.scrollTo({ y: 0, animated: true });

      return;
    }

    const thisUser = await userDecodeToken();

    // VERIFICAÇÃO SE É PACIENTE OU MEDICOS
    const url = thisUser.role === "paciente" ? "Pacientes" : "Medicos";
    try {
      await api.put(
        `/${url}?idUsuario=${thisUser.id}`,
        {
          nome: inputs.nome,
          cidade: inputs.cidade,
          logradouro: inputs.logradouro,
          cpf: inputs.cpf,
          dataNascimento:
            url == "Pacientes" ? new Date(inputs.dataNascimento) : null,
          numero: parseInt(inputs.numero),
          cep: inputs.cep,
          rg: inputs.rg,
          crm: inputs.crm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //BUSCA OS DADOS APOS ATUALIZADOS
      BuscarPorId();
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
    <ContainerScroll ref={scrollViewRef}>
      <ToastManager height={60} width={300} />
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
              onChangeText={(text) =>
                setInputs({ ...inputs, logradouro: text })
              }
              border={editMode}
              label="Logradouro"
              placeholder="Rua Itambé"
            />
            <Input
              inputValue={inputs.dataNascimento}
              onChangeText={(text) =>
                setInputs({ ...inputs, dataNascimento: text })
              }
              border={editMode}
              label="Data de nascimento:"
              {...dataMasked}
            />
            <Group row={true}>
              <Input
                inputValue={inputs.cpf}
                onChangeText={(text) => setInputs({ ...inputs, cpf: text })}
                border={editMode}
                label="CPF"
                {...cpfMasked}
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
            <Input
              inputValue={inputs.logradouro}
              onChangeText={(text) =>
                setInputs({ ...inputs, logradouro: text })
              }
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
          <Button
            onPress={
              !user
                ? () => {
                    fillProfile();
                    navigation.navigate("Login");
                  }
                : () => {
                    setEditMode(!editMode);
                    editMode ? updateProfile() : null;
                  }
            }
            text={!editMode ? "EDITAR" : "SALVAR"}
          />

          {/* BOTÃO QUE ABRE O MODAL DE SAIR DA CONTA */}
          {editMode ? (
            <Button
              onPress={() => setEditMode(false)}
              outlined
              text="CANCELAR"
            />
          ) : null}
          <Button
            onPress={() => setShowModalSairConta(true)}
            outlined
            text="SAIR DA CONTA"
          />
        </Group>

        {/* MODAL PARA SAIR DA CONTA */}
        <ModalSairConta
          Logout={Logout}
          navigation={navigation}
          setShowModalSairConta={setShowModalSairConta}
          visible={showModalSairConta}
        />
      </ContainerSpacing>
    </ContainerScroll>
  );
};
