import styled from "styled-components/native";
import { Title } from "./../Title/index";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "../Button";
import { Modal } from "react-native";
import { Group } from "./../Group/index";
import { Audio } from "expo-av";

//IMPORTAR RECURSOS DO EXPO-NOTIFICATION

import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

const PatientModal = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);

  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.View`
  width: 90%;
  gap: 20px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;

  align-items: center;
`;

const ImageModal = styled.Image`
  width: 100%;
  height: 250px;
`;

export const MyModal = ({
  cancel = false,
  visible = false,
  setShowModal,
  image,
  nome,
  email,
  idade,
  navigation,
  ...rest
}) => {
  const [sound, setSound] = useState(null);

  async function playSound() {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require("../../assets/sound/timao.mp3")
    );
    setSound(newSound);

    await newSound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //FUNCAO PARA LIDAR COM A CHAMADA DE NOTIFICACAO
  const HandleCallNotifications = async () => {
    setShowModal(false)

    //OBTEM O STATUS DA PERMISSAO
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== "granted") {
      Toast.error("Você não permitiu as notificações!");
      return;
    }

    await playSound();

    //AGENDA UMA NOTIFICACAO
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Consulta cancelada!",
        body: "Sua consulta foi cancelada com sucesso!",
      },
      trigger: null,
    });
  };

  return (
    <Modal {...rest} transparent visible={visible} animationType="fade">
      <PatientModal>
        <ModalContent>
          {cancel ? (
            <>
              <Title text="Cancelar consulta" />
              <Subtitle text="Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?" />
              <Button onPress={() => HandleCallNotifications()} text="CONFIRMAR" />
            </>
          ) : (
            <>
              <ImageModal source={image} />
              <Title text={nome} />
              <Group row gap={5}>
                <Subtitle fontSize={12} text={idade + " anos"} />
                <Subtitle fontSize={12} text={email} />
              </Group>
              <Button
                onPress={() => navigation.replace("Prontuario")}
                text="INSERIR PRONTUÁRIO"
              />
              <Button
                onPress={() => navigation.replace("Prescricao")}
                text="VER PRONTUÁRIO"
              />
            </>
          )}
          <Button onPress={() => setShowModal(false)} outlined text="Voltar" />
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
