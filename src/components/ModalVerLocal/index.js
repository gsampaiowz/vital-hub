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

const ImageStyled = styled.Image`
  width: 260px;
  border-radius: 10px;
  height: 260px;
`;

export const ModalVerLocal = ({
  setShowLocalModal,
  user,
  navigation,
  clinica,
  name,
  prioridade,
  info,
  visible = false,
  ...rest
}) => {
  return (
    <Modal {...rest} transparent visible={visible} animationType="fade">
      <PatientModal>
        <ModalContent>
          <ImageStyled source={require("./../../assets/img/UserImage.jpg")} />
          <Title text={name} />
          <Group row>
            <Subtitle bold text={prioridade} />
            <Subtitle text={user.role === "paciente" ? info : info + " anos"} />
          </Group>
          <Group>
            <Button
              onPress={() => {
                setShowLocalModal(false);
                navigation.navigate("LocalConsulta", { clinicaId: clinica });
              }}
              text="VER LOCAL DA CONSULTA"
            />
            <Button
              onPress={() => setShowLocalModal(false)}
              outlined
              text="Cancelar"
            />
          </Group>
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
