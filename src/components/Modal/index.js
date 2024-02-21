import styled from "styled-components/native";
import { Title } from "./../Title/index";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "../Button";
import { Modal } from "react-native";

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

export const MyModal = ({ cancel = false, visible = false, setShowModal, ...rest }) => {
  return (
    <Modal {...rest} visible={visible} animationType="fade">
      <PatientModal>
        <ModalContent>
          {cancel ? (
            <>
              <Title text="Cancelar consulta" />
              <Subtitle text="Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?" />
              <Button text="CONFIRMAR" />
              <Button onPress={() => setShowModal(false)} outlined text="Voltar" />
            </>
          ) : (
            <>
              <Title text="Prontuário" />
              <Subtitle text="Aqui você pode visualizar o prontuário do paciente" />
              <Button text="CONFIRMAR" />
            </>
          )}
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
