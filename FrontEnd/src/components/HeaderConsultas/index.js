import styled from "styled-components/native";
import { Subtitle } from "./../Subtitle/index";
import { Title } from "./../Title/index";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Group } from "../Group";
import { userDecodeToken } from "../../utils/Auth";
import { useEffect, useState } from "react";

const HeaderConsultasStyled = styled(LinearGradient).attrs({
  colors: ["#60BFC5", "#496BBA"],
  start: { x: -0.03, y: 1.5 },
  end: { x: 1, y: 0 },
})`
  width: 100vw;
  flex-direction: row;
  align-items: center;
  padding: 20px 20px 20px 20px;
  gap: 10px;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 25px;
  elevation: 10;
  justify-content: center;
  border-radius: 0px 0px 15px 15px;
`;

const ImageUsuario = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 5px;
`;
export const HeaderConsultas = ({ image }) => {

  const [nome, setNome] = useState("");

  useEffect(() => {
    ProfileLoad();
  }, []);

  async function ProfileLoad() {
    const token = await userDecodeToken();
    if (token) {
      console.log(token);
      setNome(token.name)
    }
  }

  return (
    <HeaderConsultasStyled>
      <ImageUsuario source={image} />
      <Group alignItems="start" gap={5}>
        <Subtitle textAlign="left" color="#4E4B59" text="Bem vindo" />
        <Title textAlign="left" color="#fbfbfb" text={nome} />
      </Group>
      <Ionicons name="notifications" size={25} color="white" />
    </HeaderConsultasStyled>
  );
};
