import styled from "styled-components/native";
import { Group } from "./../Group/index";
import { Title } from "../Title";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "./../Button/index";
import { AntDesign } from "@expo/vector-icons";

const CardConsultaStyled = styled.View`
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
  name,
  idade,
  categoria,
  horario,
  situacao,
  setShowModalProntuario,
  setShowModalCancel,
}) => {
  return (
    <CardConsultaStyled>
      <CardConsultaImage source={image} />
      <Group gap={5}>
        <Title fontSize={16} text={name} />
        <Group flexWrap gap={5} row>
          <Subtitle fontSize={14} color="#8C8A97" text={idade + " anos"} />
          <Subtitle
            fontSize={14}
            color="#8C8A97"
            bold
            text={categoria}
          />
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
      {situacao === "Agendadas" ? (
        <Button
          width={150}
          spacing={4}
          fontSize={12}
          border={false}
          outlined
          onPress={() => setShowModalCancel(true)}
          color="#C81D25"
          text="Cancelar"
        />
      ) : situacao === "Realizadas" ? (
        <Button
          width={160}
          spacing={4}
          fontSize={12}
          border={false}
          outlined
          onPress={() => setShowModalProntuario(true)}
          color="#344F8F"
          text="Ver prontuário"
        />
      ) : null}
    </CardConsultaStyled>
  );
};
