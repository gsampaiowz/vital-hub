import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "./../../components/Title/index";
import CalendarComponent from "./../../components/BigCalendar/index";
import RNPickerSelect from "react-native-picker-select";
import styled from "styled-components/native";
import { Subtitle } from "./../../components/Subtitle/index";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { ModalResumoConsulta } from "../../components/ModalResumoConsulta";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { ActivityIndicator } from "react-native";
import api from "../../service/service";

const SelectHorario = styled(RNPickerSelect)`
  width: 90%;
`;

export const SelecionarData = ({ route, navigation }) => {
  const [showResumoModal, setShowResumoModal] = useState(false);

  const dataAtual = moment().format("YYYY-MM-DD");
  const [dataSelecionada, setDataSelecionada] = useState(dataAtual);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [agendamento, setAgendamento] = useState();

  const horariosSemRepetir = new Set();
  const [arrayOptions, setArrayOptions] = useState(null);

  async function loadOptions() {
    await getHorarios();
    //CAPTURAR A QUANTIDADE DE HORAS QUE FALTAM PARA AS 24H

    const horasRestantes = 13
    
    //CRIAR LAÇO QUE RODE A QUANTIDADE DE HORAS QUE FALTAM
    const options = Array.from(
      {
        length: horasRestantes,
      },
      (_, index) => {
        let valor = 7 + (index + 1);

        //PRA CADA HORA SERÁ UMA NOVA OPTION
        if (
          horariosSemRepetir.has(
            `${dataSelecionada.split("-").reverse().join("/")} ${valor}:00`
          ) || (valor < new Date().getHours() + 1 && dataSelecionada == dataAtual)
        ) {
          return {
            label: "",
            value: "",
          };
        }
        return {
          label: `${valor}:00`,
          value: `${dataSelecionada} ${valor}:00`,
        };
      }
    );

    setArrayOptions(options.filter((option) => option.value !== ""));
  }

  useEffect(() => {
    loadOptions();
    console.log("Data selecionada: ", dataSelecionada);
    console.log("Data atual: ", dataAtual);
  }, [dataSelecionada]);

  function Continue() {
    if (horarioSelecionado != "") {
      setAgendamento({
        ...route.params.agendamento,
        dataConsulta: `${horarioSelecionado}`,
      });
      setShowResumoModal(true);
    }
  }

  async function getHorarios() {
    try {
      const response = await api.get("/Consultas/ListarTodos");
      response.data.forEach((consulta) => {
        horariosSemRepetir.add(
          moment(consulta.dataConsulta).format("DD/MM/YYYY HH:mm")
        );
      });
      console.log(horariosSemRepetir);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ContainerScroll contentContainerStyle={{ paddingTop: 20 }}>
      <Title text="Selecionar data" />
      <CalendarComponent
        setDataSelecionada={setDataSelecionada}
        dataSelecionada={dataSelecionada}
      />
      <Subtitle
        bold
        fontSize={14}
        color="black"
        text="Selecione um horário disponível"
      />
      <ContainerSpacing>
        {arrayOptions ? (
          <SelectHorario
            items={arrayOptions}
            placeholder={{ label: "Selecionar horário", value: null }}
            onValueChange={(value) => setHorarioSelecionado(value)}
          />
        ) : (
          <ActivityIndicator />
        )}
        <Group gap={10}>
          <Button onPress={() => Continue()} text="Continuar" />
          <Button outlined text="Voltar" onPress={() => navigation.goBack()} />
        </Group>
      </ContainerSpacing>
      {showResumoModal && (
        <ModalResumoConsulta
          navigation={navigation}
          resumo={agendamento}
          visible={showResumoModal}
          setShowResumoModal={setShowResumoModal}
        />
      )}
    </ContainerScroll>
  );
};
