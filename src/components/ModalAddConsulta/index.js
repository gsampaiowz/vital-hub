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
  getConsultas,
  setShowModalConsulta,
  visible = false,
  ...rest
}) => {
  const prioridades = [
    { label: "Exame", value: "A6270D61-0DC7-4819-A436-82F63D0C520E" },
    { label: "Rotina", value: "A8A248A3-FBE1-40ED-901F-1D12976A97B2" },
    { label: "Urgência", value: "D6038F3D-0384-49D6-8123-96AE2455C37A" },
  ];

  const [agendamento, setAgendamento] = useState({
    localizacao: "Rio de Janeiro",
  });

  const [cidades, setCidades] = useState([]);

  async function Continue() {
    if (agendamento.prioridadeId != null && agendamento.localizacao != null) {
      await setShowModalConsulta(false);
      navigation.navigate("SelecionarClinica", {
        agendamento: agendamento,
        getConsultas: getConsultas,
      });
    }
  }

  async function getCidades() {
    try {
      const response = await api.get(`/Clinica/ListarTodas`);
      const cities = new Set();
      response.data.forEach((clinica) => {
        if (cities.has(clinica.endereco.cidade.toLowerCase())) return;
        cities.add(clinica.endereco.cidade.toLowerCase());
        setCidades((prevState) => [
          ...prevState,
          { label: clinica.endereco.cidade, value: clinica.endereco.cidade },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCidades();
  }, []);

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
              text="Informe a prioridade da consulta"
            />
            <MySelect
              placeholder={{ label: "Prioridade da consulta", value: null }}
              items={prioridades}
              onValueChange={(value) =>
                setAgendamento({
                  ...agendamento,
                  prioridadeId: value,
                  prioridadeLabel: prioridades.find(
                    (item) => item.value === value
                  ).label,
                })
              }
            />
            <Subtitle
              bold
              fontSize={14}
              color="black"
              text="Informe a localização desejada"
            />
            <MySelect
              placeholder={{ label: "Localização", value: null }}
              items={cidades}
              inputValue={agendamento ? agendamento.localizacao : null}
              onValueChange={(value) =>
                setAgendamento({
                  ...agendamento,
                  localizacao: value,
                })
              }
            />
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
