import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import { Title } from "../Title";
import { Group } from "../Group";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "../Button";
import { Input } from "./../Input/index";
import { Modal } from "react-native";
import { useEffect, useState } from "react";
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
  width: 100%;
  gap: 20px;
  height: 465px;
  padding: 20px;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  border-radius: 10px;

  align-items: center;
`;
const MySelect = styled(RNPickerSelect)`
  width: 90%;
`;

export const ModalAddConsulta = ({
  navigation,
  setShowModalConsulta,
  visible = false,
  ...rest
}) => {
  const tiposConsulta = [
    { label: "Exame", value: 0 },
    { label: "Rotina", value: 1 },
    { label: "Urgência", value: 2 },
  ];

  const [prioridade, setPrioridade] = useState(null);

  function Continue() {
    if (prioridade != null) {
      setShowModalConsulta(false);
      navigation.navigate("SelecionarClinica", {
        prioridade: prioridade.value,
      });
    }
  }

  return (
    <Modal {...rest} transparent visible={visible} animationType="fade">
      <PatientModal>
        <ModalContent>
          <Group gap={20}>
            <Title text="Agendar Consulta" />
            <Subtitle
              bold
              fontSize={14}
              color="black"
              text="Informe o tipo de consulta"
            />
            <MySelect
              placeholder={{ label: "Tipo de consulta", value: null }}
              items={tiposConsulta}
              onValueChange={(value) => setPrioridade(value)}
            />
            {/* <Subtitle
              bold
              fontSize={14}
              color="black"
              text="Informe a localização desejada"
            /> */}
            {/* <MySelect
              placeholder={{ label: "Clínica", value: null }}
              items={clinicas}
              value={clinicaSelecionada}
              onValueChange={(value) => setClinicaSelecionada(value)}
            /> */}
            <Group gap={10}>
              <Button onPress={() => Continue()} text="Continuar" />
              <Button
                onPress={() => setShowModalConsulta(false)}
                outlined
                text="Cancelar"
              />
            </Group>
          </Group>
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
