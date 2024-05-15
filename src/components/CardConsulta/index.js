import styled from "styled-components/native";
import { Group } from "./../Group/index";
import { Title } from "../Title";
import { Subtitle } from "./../Subtitle/index";
import { Button } from "./../Button/index";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { ModalDetalhes } from "../ModalDetalhes";

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
  getConsultas,
  prioridade,
  horario,
  situacao,
  user,
  item,
  navigation,
}) => {
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);

  //TRANSFORMA OS VALORES DE PRIORIDADE EM TEXTO
  const nivelPrioridade =
    prioridade === 0 ? "Exame" : prioridade === 1 ? "Rotina" : "Urgência";

  return (
    <CardConsultaStyled>
      <CardConsultaImage source={image} />
      <Group gap={5}>
        <Title fontSize={16} text={name} />
        <Group flexWrap gap={5} row>
          <Subtitle
            fontSize={14}
            color="#8C8A97"
            text={user.role === "medico" ? info + " anos" : info}
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
      {item.situacao.situacao !== "canceladas" && (
        <Button
          width={160}
          spacing={4}
          fontSize={12}
          outlined
          onPress={() => setShowDetalhesModal(true)}
          borderColor="#344F8F"
          color="#344F8F"
          text="Ver detalhes"
        />
      )}
      <ModalDetalhes
        item={item}
        getConsultas={getConsultas}
        user={user}
        clinica={clinica}
        navigation={navigation}
        setShowDetalhesModal={setShowDetalhesModal}
        visible={showDetalhesModal}
        name={name}
        prioridade={nivelPrioridade}
        info={info}
      />
    </CardConsultaStyled>
  );
};
