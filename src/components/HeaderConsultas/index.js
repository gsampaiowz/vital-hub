import styled from "styled-components/native";
import { Subtitle } from "./../Subtitle/index";
import { Title } from "./../Title/index";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Group } from "../Group";

const HeaderConsultasStyled = styled(LinearGradient).attrs({
  colors: ["#60BFC5", "#496BBA"],
  start: { x: -0.03, y: 1.5 },
  end: { x: 1, y: 0 },
})`
  width: 100vw;
  height: 144px;
  flex-direction: row;
  align-items: center;
  padding: 60px 20px 20px 20px;
  gap: 10px;
  justify-content: center;  
  border-radius: 0px 0px 15px 15px;
`;

const ImageUsuario = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 5px;
`;
export const HeaderConsultas = ({ image, nome }) => {
  return (
    <HeaderConsultasStyled>
      <ImageUsuario source={image} />
      <Group alignItems="start" gap={5}>
        <Subtitle color="#4E4B59" text="Bem vindo" />
        <Title color="#fbfbfb" text={nome} />
      </Group>
      <Ionicons name="notifications" size={25} color="white" />
    </HeaderConsultasStyled>
  );
};