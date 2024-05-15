import styled from "styled-components/native";
import { Title } from "./../Title/index";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "../Button";
import { Modal } from "react-native";
import { Audio } from "expo-av";

//IMPORTAR RECURSOS DO EXPO-NOTIFICATION

import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";
import moment from "moment";
import api from "../../service/service";

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

export const ModalCancel = ({
  visible = false,
  setShowModal,
  item,
  getConsultas,
  navigation,
  user,
  ...rest
}) => {
  //STATE DO SOM DE NOTIFICACAO
  const [sound, setSound] = useState(null);

  //FUNCAO PARA TOCAR O SOM
  async function playSound() {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require("../../assets/sound/timao.mp3")
    );
    setSound(newSound);

    await newSound.playAsync();
  }

  //PARA DESATIVAR O SOM QUANDO O MODAL FOR DESMONTADO
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //FUNCAO PARA LIDAR COM A CHAMADA DE NOTIFICACAO
  const HandleCallNotifications = async () => {
    setShowModal(false);

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
        body: `Sua consulta do dia ${moment(item.dataConsulta).format(
          "DD/MM"
        )} foi cancelada com sucesso!`,
      },
      trigger: null,
    });
  };

  //CANCELAR CONSULTA
  async function CancelarConsulta() {
    try {
      await api.put(
        `/Consultas/Status?idConsulta=${item.id}&status=canceladas`
      );
      await getConsultas();
      HandleCallNotifications();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal {...rest} transparent visible={visible} animationType="fade">
      <PatientModal>
        <ModalContent>
          <Title text="Cancelar consulta" />
          <Subtitle text="Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?" />
          <Button onPress={() => CancelarConsulta()} text="CONFIRMAR" />

          <Button onPress={() => setShowModal(false)} outlined text="Voltar" />
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
