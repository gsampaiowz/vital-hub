import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import { Title } from "../Title";
import { Group } from "../Group";
import { Subtitle } from "./../Subtitle/index";
import { AntDesign } from "@expo/vector-icons";
import { ContainerSpacing } from "../Container";

const ModalBackground = styled.View`
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.View`
  height: 520px;
  padding: 20px 0;
  width: 100%;
  gap: 20px;
  background-color: white;
  position: fixed;
  bottom: 0;
  z-index: 11;
  border-radius: 10px 10px 0 0;
`;

const SelectTipoConsulta = styled(RNPickerSelect)`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalAddConsulta = () => {
  const tiposConsulta = [
    { label: "Cardiologista", value: "cardiologista" },
    { label: "Ortopedista", value: "ortopedista" },
    { label: "Dermatologista", value: "dermatologista" },
  ];

  return (
    <ModalBackground>
      <ModalContent>
        <ContainerSpacing>
          <Title text="Agendar Consulta" />
          <Group gap={5}>
            <Subtitle
              bold
              fontSize={14}
              color="black"
              text="Informe o tipo de consulta"
            />
            <SelectTipoConsulta
              value={tiposConsulta[0]}
              items={tiposConsulta}
            />
          </Group>
        </ContainerSpacing>
      </ModalContent>
    </ModalBackground>
  );
};
