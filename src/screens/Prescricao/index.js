import { PacienteImage } from "../../components/PacienteImage";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { useState } from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const Prescricao = () => {
  const [editMode, setEditMode] = useState(false);

  const Divider = styled.View`
    width: 100%;
    height: 1px;
    background-color: #8c8a97;
    margin: 10px 0;
  `;

  return (
    <ContainerScroll
      contentContainerStyle={{
        alignItems: "center",
        gap: 20,
        paddingBottom: 20,
      }}
    >
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
        <Title text={"Romário"} />

        <Group>
          <Subtitle text="22 anos" />
          <Subtitle text="romario@email.com" />
        </Group>

        <Input
          height={100}
          border={editMode}
          label="Descrição da consulta:"
          placeholder="Descrição da consulta:"
        />

        <Input
          border={editMode}
          label="Diagnóstico do paciente:"
          placeholder="Diagnóstico do paciente"
        />

        <Input
          height={100}
          border={editMode}
          label="Prescrição médica:"
          placeholder="Prescrição médica"
        />
        <Group>
          <Input
            height={100}
            border={editMode}
            label="Exames médicos:"
            icon={
              <AntDesign name="exclamationcircleo" size={24} color="#4E4B59" />
            }
            placeholder="Nenhuma foto informada"
          />
          <Group row>
            <Button
              text={[
                <Feather name="camera" size={24} color="white" />,
                "Enviar",
              ]}
            />
            <Button
              spacing={4}
              fontSize={12}
              outlined
              borderColor="#C81D25"
              color="#C81D25"
              text="Cancelar"
            />
          </Group>
        </Group>

        <Divider />

        <Input
          border={false}
          height={100}
          placeholder="Resultado do exame de sangue : tudo normal"
        />

        <Group gap={10}>
          <Button
            onPress={() => setEditMode(!editMode)}
            text={editMode ? "SALVAR" : "EDITAR"}
          />

          <Button outlined text="Voltar" />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
