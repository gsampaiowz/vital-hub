import styled from "styled-components/native";
import { Title } from "./../Title/index";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "../Button";
import { Modal } from "react-native";
import { Audio } from "expo-av";

//IMPORTAR RECURSOS DO EXPO-NOTIFICATION

import * as Notifications from "expo-notifications";
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
  setShowDetalhesModal,
  getConsultas,
  item,
  navigation,
  user,
  ...rest
}) => {
  //FUNCAO PARA TOCAR O SOM
  async function playSound() {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require("../../assets/sound/timao.mp3")
    );

    await newSound.playAsync();
  }

  //FUNCAO PARA LIDAR COM A CHAMADA DE NOTIFICACAO
  const HandleCallNotifications = async () => {
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
      setShowModal(false);
      setShowDetalhesModal(false);
      navigation.navigate("Main");
      HandleCallNotifications();
      getConsultas();
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
