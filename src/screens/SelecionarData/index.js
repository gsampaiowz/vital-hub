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
  //STATE PARA ABRIR MODAL COM RESUMO DA CONSULTA
  const [showResumoModal, setShowResumoModal] = useState(false);

  //PEGA A DATA ATUAL
  const dataAtual = moment().format("YYYY-MM-DD");
  //STATE DA DATA SELECIONADA
  const [dataSelecionada, setDataSelecionada] = useState(dataAtual);
  //STATE DO HORARIO SELECIONADO
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  //STATE DO AGENDAMENTO DA CONSULTA PARA RECEBER TODOS OS DADOS
  const [agendamento, setAgendamento] = useState();
//SET PARA NÃO REPETIR HORARIOS
  const horariosSemRepetir = new Set();
  //ARRAY PARA SELECIONAR HORARIOS
  const [arrayOptions, setArrayOptions] = useState(null);

  //FUNCTION PARA CARREGAR AS OPCOES DE HORARIOS
  async function loadOptions() {
    //BUSCA HORARIOS NA API
    await getHorarios();

    //HORAS QUE A CLINICA VAI FICAR ABERTA
    const horasRestantes = 13;

    //CRIAR LAÇO QUE RODE A QUANTIDADE DE HORAS QUE FALTAM
    const options = Array.from(
      {
        length: horasRestantes,
      },
      (_, index) => {
        let valor = 7 + (index + 1);

        //PRA CADA HORA SERÁ UMA NOVA OPTION
        //NAO DEIXA REPETIR CADASTRO COM MESMO HORARIO NO MESMO DIA
        if (
          horariosSemRepetir.has(
            `${dataSelecionada.split("-").reverse().join("/")} ${valor}:00`
          ) ||
          (valor < new Date().getHours() + 1 && dataSelecionada == dataAtual)
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

    //FILTRA AS OPCOES QUE NÃO ESTÁO REPETIDAS
    setArrayOptions(options.filter((option) => option.value !== ""));
  }

  //CARREGA AS OPCOES DO SELECT AO SELECIONAR OUTRA DATA
  useEffect(() => {
    loadOptions();
  }, [dataSelecionada]);

  //FUNCTION DE CONTINUAR PARA O MODAL
  function Continue() {
    if (horarioSelecionado != "") {
      setAgendamento({
        ...route.params.agendamento,
        dataConsulta: `${horarioSelecionado}`,
      });
      setShowResumoModal(true);
    }
  }

  //FUNCTION Q BUSCA HORARIOS NA API
  async function getHorarios() {
    try {
      const response = await api.get("/Consultas/ListarTodos");
      //ADICIONA OS HORARIOS AO SET
      response.data.forEach((consulta) => {
        if (consulta.situacao.situacao === "agendadas") {
          horariosSemRepetir.add(
            moment(consulta.dataConsulta).format("DD/MM/YYYY HH:mm")
          );
        }
      });
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
