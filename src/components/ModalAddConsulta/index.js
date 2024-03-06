import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import { Title } from "../Title";
import { Group } from "../Group";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "../Button";
import { useState } from "react";
import { Input } from "./../Input/index";
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
const SelectTipoConsulta = styled(RNPickerSelect)`
  width: 90%;
`;

export const ModalAddConsulta = ({
  items,
  setShowModalConsulta,
  visible = false,
  ...rest
}) => {
  const [statusButtons, setStatusButtons] = useState("Rotina");

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
              <SelectTipoConsulta
                placeholder={{ label: "Tipo de consulta" }}
                items={items}
              />
              <Subtitle
                bold
                fontSize={14}
                color="black"
                text="Qual o nível da consulta?"
              />
              <Group row>
                <Button
                  borderColor="#60BFC5"
                  color="#34898F"
                  onPress={() => setStatusButtons("Rotina")}
                  clickButton={statusButtons === "Rotina"}
                  fontSize={12}
                  text="Agendadas"
                />
                <Button
                  borderColor="#60BFC5"
                  color="#34898F"
                  onPress={() => setStatusButtons("Exame")}
                  clickButton={statusButtons === "Exame"}
                  fontSize={12}
                  text="Realizadas"
                />
                <Button
                  borderColor="#60BFC5"
                  color="#34898F"
                  onPress={() => setStatusButtons("Urgência")}
                  clickButton={statusButtons === "Urgência"}
                  fontSize={12}
                  text="Canceladas"
                />
              </Group>
              <Subtitle
                bold
                fontSize={14}
                color="black"
                text="Informe a localização desejada"
              />
              <Input placeholder="Informe a localização" />
              <Group gap={10}>
                <Button text="Continuar" />
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
