import { PacienteImage } from "../../components/PacienteImage";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Modal } from "react-native";

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #8c8a97;
  margin: 10px 0;
`;

const CloseCamera = styled(AntDesign)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

const ToggleCamera = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;

const TakePhoto = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -25px;
  z-index: 10;
`;

const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalButtons = styled.View`
  flex-direction: row;
  margin: 10px;
`;

const ModalImage = styled.Image`
  width: 100%;
  height: 500px;
`;

const InputImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const Prescricao = () => {
  const cameraRef = useRef(null);

  const [editMode, setEditMode] = useState(false);

  const [inCamera, setInCamera] = useState(false);

  const [type, setType] = useState(CameraType.front);

  const [photo, setPhoto] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
    })();
  }, []);

  async function CapturePhoto() {
    if (cameraRef) {
      const fotoTirada = await cameraRef.current.takePictureAsync();

      await setPhoto(fotoTirada.uri);

      setInCamera(false);
      setModalOpen(true);

      console.log(fotoTirada);
    }
  }

  return inCamera ? (
    <Camera
      ref={cameraRef}
      type={type}
      ratio="15:9"
      style={{
        flex: 1,
      }}
    >
      <CloseCamera
        name="closecircle"
        size={40}
        color="#49B3BA"
        onPress={() => setInCamera(false)}
      />
      <ToggleCamera
        onPress={() =>
          setType(
            type === CameraType.front ? CameraType.back : CameraType.front
          )
        }
      >
        <FontAwesome6 name="camera-rotate" size={40} color="#49B3BA" />
      </ToggleCamera>
      <TakePhoto onPress={() => CapturePhoto()}>
        <FontAwesome name="camera" size={50} color="#49B3BA" />
      </TakePhoto>
    </Camera>
  ) : (
    <ContainerScroll>
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
        <Title text={"Romário"} />

        <Group>
          <Subtitle text="22 anos" />
          <Subtitle text="romario@email.com" />
        </Group>

        <Input
          height={100}
          border={editMode}
          label="Descrição da consulta:"
          placeholder="Descrição da consulta:"
        />

        <Input
          border={editMode}
          label="Diagnóstico do paciente:"
          placeholder="Diagnóstico do paciente"
        />

        <Input
          height={100}
          border={editMode}
          label="Prescrição médica:"
          placeholder="Prescrição médica"
        />
        <Group>
          <Input
          
            height={100}
            border={editMode}
            label="Exames médicos:"
            icon={
              <AntDesign name="exclamationcircleo" size={24} color="#4E4B59" />
            }
            placeholder="Nenhuma foto informada"
            inputValue={
              photo != null ? <InputImage source={{ uri: photo }} /> : null
            }
          />
          <Group row>
            <Button
              onPress={() => setInCamera(true)}
              text={"Enviar"}
              icon={<Feather name="camera" size={18} color="white" />}
            />
            <Button borderColor="#C81D25" color="#C81D25" text="Cancelar" />
          </Group>
        </Group>

        <Divider />

        <Input
          border={false}
          height={100}
          placeholder="Resultado do exame de sangue : tudo normal"
        />

        <Group gap={10}>
          <Button
            onPress={() => setEditMode(!editMode)}
            text={editMode ? "SALVAR" : "EDITAR"}
          />

          <Button outlined text="Voltar" />
        </Group>
      </ContainerSpacing>
      <Modal animationType="slide" transparent={false} visible={modalOpen}>
        <ModalContent>
          <ModalButtons>
            <AntDesign
              onPress={() => setModalOpen(false)}
              name="closecircle"
              color="#49B3BA"
              size={40}
            />
          </ModalButtons>
          <ModalImage source={{ uri: photo }} />
        </ModalContent>
      </Modal>
    </ContainerScroll>
  );
};
