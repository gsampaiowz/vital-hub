import { ContainerSafe, ContainerSpacing } from "../../components/Container";
import { Title } from "./../../components/Title/index";
import CalendarComponent from "./../../components/BigCalendar/index";
import RNPickerSelect from "react-native-picker-select";
import styled from "styled-components/native";
import { Subtitle } from "./../../components/Subtitle/index";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { ResumoConsulta } from "../../components/ResumoConsulta";
import { useState } from "react";

const SelectHorario = styled(RNPickerSelect)`
  width: 90%;
`;

export const SelecionarData = () => {
  const horarios = [
    { label: "12h00", value: "12h00" },
    { label: "14h00", value: "14h00" },
    { label: "16h00", value: "16h00" },
  ];

  const [showResumoModal, setShowResumoModal] = useState(false);

  return (
    <ContainerSafe>
      <Title text="Selecionar data" />
      <CalendarComponent />
      <Subtitle
        bold
        fontSize={14}
        color="black"
        text="Selecione um horário disponível"
      />
      <ContainerSpacing>
        <SelectHorario
          items={horarios}
          placeholder={{ label: "Selecionar horário" }}
        />
        <Group gap={10}>
          <Button onPress={() => setShowResumoModal(true)} text="Continuar" />
          <Button outlined text="Cancelar" />
        </Group>
      </ContainerSpacing>
      {showResumoModal && <ResumoConsulta visible={showResumoModal} setShowResumoModal={setShowResumoModal} />}
    </ContainerSafe>
  );
};
