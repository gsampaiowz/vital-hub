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

const SelectHorario = styled(RNPickerSelect)`
  width: 90%;
`;

export const SelecionarData = ({ route, navigation }) => {
  const [showResumoModal, setShowResumoModal] = useState(false);

  const dataAtual = moment().format("YYYY-MM-DD");
  const [dataSelecionada, setDataSelecionada] = useState(dataAtual);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [agendamento, setAgendamento] = useState();

  const [arrayOptions, setArrayOptions] = useState(null);

  const currentDate = new Date();
  const startingDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const [data, setData] = useState(startingDate);

  const [selected, setSelected] = useState(
    data.toLocaleDateString().split("/").reverse().join("-")
  );

  useEffect(() => {
    console.log(dataSelecionada);
  }, [dataSelecionada]);

  async function loadOptions() {
    //CAPTURAR A QUANTIDADE DE HORAS QUE FALTAM PARA AS 24H
    const horasRestantes = moment(dataAtual)
      .add(21, "hours")
      .diff(moment(), "hours");

    //CRIAR LAÇO QUE RODE A QUANTIDADE DE HORAS QUE FALTAM
    const options = Array.from(
      {
        length: horasRestantes,
      },
      (_, index) => {
        let valor = new Date().getHours() + (index + 1);

        //PRA CADA HORA SERÁ UMA NOVA OPTION
        return {
          label: `${valor}:00`,
          value: `${valor}:00`,
        };
      }
    );

    setArrayOptions(options);
  }

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <ContainerScroll contentContainerStyle={{ paddingTop: 20 }}>
      <Title text="Selecionar data" />
      <CalendarComponent
        setDataSelecionada={setDataSelecionada}
        dataSelecionada={dataSelecionada}
        setSelected={setSelected}
        selected={selected}
        data={data}
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
          <Button onPress={() => setShowResumoModal(true)} text="Continuar" />
          <Button outlined text="Voltar" onPress={() => navigation.goBack()} />
        </Group>
      </ContainerSpacing>
      {showResumoModal && (
        <ModalResumoConsulta
          visible={showResumoModal}
          setShowResumoModal={setShowResumoModal}
        />
      )}
    </ContainerScroll>
  );
};
