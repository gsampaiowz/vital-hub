import { Modal } from "react-native";
import styled from "styled-components/native";
import { Button } from "../Button";
import { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Toast } from "toastify-react-native";

const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 12px;
  z-index: 10;
`;

const ModalImage = styled.Image`
  width: 100%;
  height: 500px;
`;

export const CameraModal = ({
  photoUri,
  visible,
  setInCamera,
  setModalOpen,
  isPhotoSaved,
  setIsPhotoSaved,
  ...rest
}) => {
  const [fotoGaleria, setFotoGaleria] = useState(null);

  const handleButtonPress = async () => {
    if (isPhotoSaved) {
      await ClearPhoto();
    } else {
      await UploadPhoto();
    }
  };

  async function UploadPhoto() {
    await MediaLibrary.createAssetAsync(photoUri)
      .then((response) => {
        setFotoGaleria(response);
        setIsPhotoSaved(true);
        Toast.success("Foto salva com sucesso");
      })
      .catch(() => {
        Toast.error("Erro ao salvar a foto");
      });
  }

  async function ClearPhoto() {
    try {
      await MediaLibrary.deleteAssetsAsync(fotoGaleria);
      Toast.success("Foto apagada com sucesso");
      setIsPhotoSaved(false);
    } catch (error) {
      Toast.error("Falha ao apagar foto");
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      {...rest}
    >
      <ModalContent>
        <Button
          width="90%"
          onPress={() => handleButtonPress()}
          text={!isPhotoSaved ? "Salvar foto" : "Apagar foto"}
        />
        <Button
          width="90%"
          onPress={() => setInCamera(true)}
          text="Tirar outra"
        />

        <ModalImage source={{ uri: photoUri }} />

        <Button
          width="90%"
          onPress={() => setModalOpen(false)}
          text="Confirmar"
        />
      </ModalContent>
    </Modal>
  );
};
