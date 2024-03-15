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
import { Camera, CameraType, CameraRecordingOptions } from "expo-camera";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { CameraModal } from "../../components/CameraModal";
import {
  PinchGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

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

const InputImage = styled.Image`
  height: 500px;
  border-radius: 20px;
`;

const ImagePress = styled.TouchableOpacity`
  width: 100%;
`;

const FlashIcon = styled(Ionicons)`
  left: 50%;
  top: 10px;
  margin-left: -20px;
  z-index: 10;
`;

const TakeVideo = styled(AntDesign)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
`;

export const Prescricao = () => {
  const cameraRef = useRef(null);

  const [editMode, setEditMode] = useState(false);

  const [inCamera, setInCamera] = useState(false);

  const [type, setType] = useState(CameraType.back);

  const [photo, setPhoto] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [zoom, setZoom] = useState(0);

  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const [isPhotoSaved, setIsPhotoSaved] = useState(false);

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();

      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  async function CapturePhoto() {
    if (cameraRef) {
      const options = {
        quality: 1,
        isImageMirror: false,
      };

      const fotoTirada = await cameraRef.current.takePictureAsync(options);

      await setPhoto(fotoTirada.uri);

      console.log(fotoTirada);

      setInCamera(false);
      setModalOpen(true);
    }
  }

  const changeZoom = (event) => {
    if (event.nativeEvent.scale > 1 && zoom < 1) {
      setZoom(zoom + 0.1);
    }
    if (event.nativeEvent.scale < 1 && zoom > 0) {
      setZoom(zoom - 0.1);
    }
  };

  return inCamera ? (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PinchGestureHandler onGestureEvent={(event) => changeZoom(event)}>
        <Camera
          autoFocus={Camera.Constants.AutoFocus.on}
          zoom={zoom}
          flashMode={flash}
          isIma
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
          <FlashIcon
            onPress={() =>
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : flash === Camera.Constants.FlashMode.on
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              )
            }
            name={
              flash === Camera.Constants.FlashMode.off
                ? "flash-off"
                : flash === Camera.Constants.FlashMode.torch
                ? "flashlight"
                : "flash"
            }
            size={40}
            color="#49B3BA"
          />
          <TakePhoto
            onPress={() => {
              CapturePhoto();
              setIsPhotoSaved(false);
            }}
          >
            <FontAwesome name="camera" size={50} color="#49B3BA" />
          </TakePhoto>
          <TakeVideo
            onPress={() => isRecording ? CameraRecordingOptions.stopRecording() : CameraRecordingOptions.recordAsync()}
            name="videocamera"
            size={24}
            color={isRecording ? "red" : "#49B3BA"}
          />
        </Camera>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  ) : (
    <ContainerScroll>
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
        <Title text={"Romário"} />

        <Group row>
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
        <>
          {photo != null ? (
            <>
              <Subtitle bold text="Exame médico" />
              <ImagePress onPress={() => setModalOpen(true)}>
                <InputImage source={{ uri: photo }} />
              </ImagePress>
            </>
          ) : (
            <Input
              height={100}
              border={editMode}
              label="Exames médicos:"
              icon={
                <AntDesign
                  name="exclamationcircleo"
                  size={24}
                  color="#4E4B59"
                />
              }
              placeholder={"Nenhuma foto informada"}
            />
          )}
          <Button
            onPress={() => setInCamera(true)}
            text={photo != null ? "Trocar" : "Enviar"}
            icon={<Feather name="camera" size={18} color="white" />}
          />
        </>

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
      <CameraModal
        isPhotoSaved={isPhotoSaved}
        setIsPhotoSaved={setIsPhotoSaved}
        setInCamera={setInCamera}
        setModalOpen={setModalOpen}
        visible={modalOpen}
        photoUri={photo}
      />
    </ContainerScroll>
  );
};
