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
import { ActivityIndicator, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { userDecodeToken } from "../../utils/Auth";

const style = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "MontserratAlternates_600SemiBold",
  },
  inputAndroid: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignItems: "center",
    justifyContent: "center",

    fontFamily: "MontserratAlternates_600SemiBold",
  },
  iconContainer: {
    top: "25%",
    marginRight: 10,
  },
  placeholder: {
    color: "#34898F",
  },
});

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

  function Continue() {
    if (horarioSelecionado != "") {
      setAgendamento({
        ...route.params.agendamento,
        dataConsulta: `${dataSelecionada} ${horarioSelecionado}`,
      });
      setShowResumoModal(true);
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
          getConsultas={route.params.getConsultas}
          navigation={navigation}
          resumo={agendamento}
          visible={showResumoModal}
          setShowResumoModal={setShowResumoModal}
        />
      )}
    </ContainerScroll>
  );
};
