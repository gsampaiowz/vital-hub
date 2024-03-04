import styled from "styled-components/native";
import { Modal } from "react-native";
import { Title } from "../Title";
import { Subtitle } from "../Subtitle/index";
import { Button } from "../Button";
import { Group } from "../Group";

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

export const ModalResumoConsulta = ({ setShowResumoModal, visible = false, ...rest }) => {
  return (
    <Modal {...rest} visible={visible} animationType="fade">
      <PatientModal>
        <ModalContent>
          <Title text="Agendar consulta" />
          <Subtitle
            bold
            text="Consulte os dados selecionados para a sua consulta"
          />
          <Group>
            <Subtitle color="black" bold text="Data da consulta" />
            <Subtitle text="10 de Março de 2024" />
          </Group>
          <Group>
            <Subtitle color="black" bold text="Médico(a) da consulta" />
            <Subtitle text="Dra Alessandra" />
            <Subtitle text="Demartologa, Esteticista" />
          </Group>
          <Group>
            <Subtitle color="black" bold text="Local da consulta" />
            <Subtitle text="São Paulo, SP" />
          </Group>
          <Group>
            <Subtitle color="black" bold text="Tipo da consulta" />
            <Subtitle text="Rotina" />
          </Group>
          <Group gap={10}>
            <Button text="Continuar" />
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
