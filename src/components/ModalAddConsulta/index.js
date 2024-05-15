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
  //STATE DO PRIORIDADES COM IDS DO BANCO DE DADOS
  const prioridades = [
    { label: "Exame", value: "43FFA829-7896-4BF2-9DBF-C28249726DE6" },
    { label: "Rotina", value: "299A8E90-4459-4F59-BCC5-F0F5CE876FA5" },
    { label: "Urgência", value: "4397D79A-2B8D-4A53-9F07-0ECEA4A6A138" },
  ];

  //STATE DO AGENDAMENTO PARA PASSAR NO ROUTE
  const [agendamento, setAgendamento] = useState({
    localizacao: "Rio de Janeiro",
  });

  //STATE DAS CIDADES QUE EM QUE EXISTEM CLINICAS VITALHUB
  const [cidades, setCidades] = useState([]);

  //FUNCTION PARA NAVEGAR E PASSAR DADOS NO ROUTE
  async function Continue() {
    if (agendamento.prioridadeId != null && agendamento.localizacao != null) {
      await setShowModalConsulta(false);
      navigation.navigate("SelecionarClinica", {
        agendamento: agendamento,
        getConsultas: getConsultas,
      });
    }
  }

  //BUSCA CIDADES PARA MOSTRAR NO SELECT
  async function getCidades() {
    try {
      const response = await api.get(`/Clinica/ListarTodas`);
      setCidades([]);
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

  //BUSCA CIDADES AO INICIAR
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
