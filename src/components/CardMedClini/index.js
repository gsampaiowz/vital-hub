import styled from "styled-components/native";
import { Title } from "./../Title/index";
import { Subtitle } from "./../Subtitle/index";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Group } from "./../Group/index";
import { useEffect, useState } from "react";

const ImageStyled = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
`;

const SubtitleAberto = styled.Text`
  color: #49b3ba;
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 5px;
  background-color: #e8fcfd;
  font-family: Quicksand_600SemiBold;
`;

export const CardMedClini = ({
  isClinica = false,
  image = "",
  name,
  clinicaSelecionada,
  setClinica,
  clinica,
  medico,
  medicoSelecionado,
  setMedico,
  desc,
  aberto,
  estrelas,
}) => {
  const CardStyled = styled.Pressable`
    background-color: #fff;
    border-radius: 5px;
    flex-direction: row;
    padding: 10px;
    width: 90%;
    align-items: center;
    border-width: 2px;
    border-color: ${isClinica ? clinicaSelecionada.id == clinica.clinicaId 
      ? "#496bba"
      : "#fff" : medicoSelecionado.id == medico.medicoClinicaId ? "#496bba" : "#fff"};
    gap: 10px;
    margin: 0 auto;
    margin-bottom: 10px;
    shadow-color: #000;
    shadow-opacity: 0.08;
    shadow-offset: -2px 4px;
    shadow-radius: 25px;
    elevation: 5;
  `;

  return (
    <CardStyled
      onPress={() => {
        isClinica
          ? setClinica({
              clinicaId: clinicaSelecionada.id,
              clinicaLabel: clinicaSelecionada.nomeFantasia,
            })
          : setMedico({
              medicoClinicaId: medicoSelecionado.id,
              medicoLabel: medicoSelecionado.idNavigation.nome,
              medicoEspecialidade: medicoSelecionado.especialidade,
            });
      }}
    >
      {!isClinica && <ImageStyled source={image} />}
      <Group alignItems="flex-start">
        <Title fontSize={16} text={name} />
        <Subtitle bold fontSize={14} textAlign="left" text={desc} />
      </Group>
      {isClinica && (
        <Group alignItems="flex-end">
          <Subtitle
            bold
            color="#F9A620"
            text={[
              <AntDesign key="star" size={14} color={"#F9A620"} name="star" />,
              " ",
              estrelas,
            ]}
          />

          <SubtitleAberto>
            <MaterialCommunityIcons name="calendar" size={14} color="#49b3ba" />
            {aberto}
          </SubtitleAberto>
        </Group>
      )}
    </CardStyled>
  );
};
