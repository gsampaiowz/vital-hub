import styled from "styled-components/native";
import { ActivityIndicator, Modal } from "react-native";
import { Title } from "../Title";
import { Subtitle } from "../Subtitle/index";
import { Button } from "../Button";
import { Group } from "../Group";
import moment from "moment";
import api from "./../../service/service";
import { userDecodeToken } from "../../utils/Auth";
import { useState } from "react";

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

  async function CadastrarConsulta() {
    setLoading(true)
    const user = await userDecodeToken();
    try {
      await api.post("/Consultas/Cadastrar", {
        ...resumo,
        situacaoId: "8240E2BC-531C-46A4-9361-36D3BCEF2B6D",
        pacienteId: user.id,
      });
      setShowResumoModal(false);
      navigation.navigate("Main");
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
