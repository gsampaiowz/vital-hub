import styled from "styled-components/native";
import { ActivityIndicator, Modal } from "react-native";
import { Title } from "../Title";
import { Subtitle } from "../Subtitle/index";
import { Button } from "../Button";
import { Group } from "../Group";
import moment from "moment";
import api from "./../../service/service";
import { userDecodeToken } from "../../utils/Auth";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

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

export const ModalResumoConsulta = ({
  resumo,
  navigation,
  getConsultas,
  setShowResumoModal,
  visible = false,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

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
    setShowResumoModal(false);

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
        title: "Consulta cadastrada!",
        body: `Cadastro de consulta concluído para o dia ${moment(item.dataConsulta).format(
          "DD/MM"
        )}.`,
      },
      trigger: null,
    });
  };

  async function CadastrarConsulta() {
    setLoading(true);
    const user = await userDecodeToken();
    try {
      await api.post("/Consultas/Cadastrar", {
        ...resumo,
        situacaoId: "8240E2BC-531C-46A4-9361-36D3BCEF2B6D",
        pacienteId: user.id,
      });
      navigation.navigate("Main");
      HandleCallNotifications();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal {...rest} transparent visible={visible} animationType="fade">
      <PatientModal>
        <ModalContent>
          <Title text="Agendar consulta" />
          <Subtitle
            bold
            text="Consulte os dados selecionados para a sua consulta"
          />
          <Group>
            <Subtitle color="black" bold text="Data da consulta" />
            <Subtitle
              text={moment(resumo.dataConsulta).format("DD/MM/YYYY HH:mm")}
            />
          </Group>
          <Group>
            <Subtitle color="black" bold text="Médico(a) da consulta" />
            <Subtitle text={resumo.medicoLabel} />
            <Subtitle text={resumo.medicoEspecialidade.especialidade1} />
          </Group>
          <Group>
            <Subtitle color="black" bold text="Local da consulta" />
            <Subtitle text={resumo.localizacao} />
          </Group>
          <Group>
            <Subtitle color="black" bold text="Tipo da consulta" />
            <Subtitle text={resumo.prioridadeLabel} />
          </Group>
          <Group gap={10}>
            <Button
              text={loading ? <ActivityIndicator /> : "Continuar"}
              onPress={() => !loading && CadastrarConsulta()}
            />
            <Button
              onPress={() => setShowResumoModal(false)}
              outlined
              text="Cancelar"
            />
          </Group>
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
