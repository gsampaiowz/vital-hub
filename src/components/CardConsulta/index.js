import styled from "styled-components/native";
import { Group } from "./../Group/index";
import { Title } from "../Title";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "./../Button/index";
import { AntDesign } from "@expo/vector-icons";

const CardConsultaStyled = styled.View`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
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

const ButtonCancelar = styled.Pressable`
  color: #c81d25;
  width: 100%;
  border-radius: 5px;
  flex-shrink: 1;
  font-size: 12px;
  font-family: MontserratAlternates_500Medium;
`;

export const CardConsulta = ({ image, name, idade, categoria, horario }) => {
  return (
    <CardConsultaStyled>
      <CardConsultaImage source={image} />
      <Group gap={5}>
        <Title fontSize={16} text={name} />
        <Group gap={5} flexWrap row>
          <Subtitle fontSize={14} color="#8C8A97" text={idade + " anos •"} />
          <Subtitle fontSize={14} color="#8C8A97" bold text={categoria} />
        </Group>
        <Group row gap={5}>
          <AntDesign name="clockcircle" size={14} color="#49B3BA" />
          <Subtitle fontSize={14} bold color="#49B3BA" text={horario} />
        </Group>
      </Group>
      <ButtonCancelar>Cancelar</ButtonCancelar>
    </CardConsultaStyled>
  );
};
