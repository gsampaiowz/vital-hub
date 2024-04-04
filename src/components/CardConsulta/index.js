import styled from "styled-components/native";
import { Group } from "./../Group/index";
import { Title } from "../Title";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "./../Button/index";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { ModalVerLocal } from "../ModalVerLocal";
import api from "../../service/service";

const CardConsultaStyled = styled.Pressable`
  width: 90%;
  padding: 10px;
  height: 100px;
  align-self: center;
  margin-bottom: 10px;
  border-radius: 5px;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-offset: -2px 4px;
  shadow-radius: 25px;
  elevation: 5;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const CardConsultaImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
`;

export const CardConsulta = ({
  image,
  clinica,
  name,
  info,
  prioridade,
  horario,
  situacao,
  setShowModalProntuario,
  setShowModalCancel,
  user,
  navigation,
  onPress,
}) => {
  const [showLocalModal, setShowLocalModal] = useState(false);

  const nivelPrioridade =
    prioridade === 0 ? "Exame" : prioridade === 1 ? "Rotina" : "Urgência";

  return (
    <CardConsultaStyled
      onPress={() => {
        setShowLocalModal(true);
        onPress;
      }}
    >
      <CardConsultaImage source={image} />
      <Group gap={5}>
        <Title fontSize={16} text={name} />
        <Group flexWrap gap={5} row>
          <Subtitle
            fontSize={14}
            color="#8C8A97"
            text={user.role === "Paciente" ? info + " anos" : info}
          />
          <Subtitle fontSize={14} color="#8C8A97" bold text={nivelPrioridade} />
        </Group>
        <Group
          padding={2}
          radius={5}
          bgColor={situacao === "Agendadas" ? "#E8FCFD" : "#F1F0F5"}
          row
          gap={5}
        >
          <AntDesign
            name="clockcircle"
            size={12}
            color={situacao === "Agendadas" ? "#49B3BA" : "#4E4B59"}
          />
          <Subtitle
            fontSize={12}
            bold
            color={situacao === "Agendadas" ? "#49B3BA" : "#4E4B59"}
            text={horario}
          />
        </Group>
      </Group>
      {situacao === "agendadas" ? (
        <Button
          width={150}
          spacing={4}
          fontSize={12}
          outlined
          onPress={() => setShowModalCancel(true)}
          borderColor="#C81D25"
          color="#C81D25"
          text="Cancelar"
        />
      ) : situacao === "realizadas" ? (
        <Button
          width={160}
          spacing={4}
          fontSize={12}
          outlined
          onPress={() => setShowModalProntuario(true)}
          borderColor="#344F8F"
          color="#344F8F"
          text="Ver prontuário"
        />
      ) : null}
      <ModalVerLocal
        clinica={clinica}
        navigation={navigation}
        setShowLocalModal={setShowLocalModal}
        visible={showLocalModal}
        name={name}
        prioridade={nivelPrioridade}
        info={info}
      />
    </CardConsultaStyled>
  );
};
