import styled from "styled-components/native";
import { Title } from "./../Title/index";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "../Button";
import { Modal } from "react-native";
import { Group } from "./../Group/index";

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
  ...rest
}) => {
  return (
    <Modal {...rest} visible={visible} animationType="fade">
      <PatientModal>
        <ModalContent>
          {cancel ? (
            <>
              <Title text="Cancelar consulta" />
              <Subtitle text="Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?" />
              <Button text="CONFIRMAR" />
            </>
          ) : (
            <>
              <ImageModal source={image} />
              <Title text={nome} />
              <Group row gap={5}>
                <Subtitle fontSize={12} text={idade + " anos"} />
                <Subtitle fontSize={12} text={email} />
              </Group>
              <Button text="INSERIR PRONTUÁRIO" />
            </>
          )}
          <Button onPress={() => setShowModal(false)} outlined text="Voltar" />
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
