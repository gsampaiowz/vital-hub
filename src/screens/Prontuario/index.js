import { PacienteImage } from "../../components/PacienteImage";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { useState } from "react";

export const Prontuario = () => {
  const [editMode, setEditMode] = useState(false);

  const [inputs, setInputs] = useState({
    dataNascimento: "",
    cpf: "",
    endereco: "",
    cep: "",
    cidade: "",
  });

  return (
    <ContainerScroll
      contentContainerStyle={{
        alignItems: "center",
        gap: 20,
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
          inputValue={inputs.dataNascimento}
          onChange={(text) => setInputs({ ...inputs, dataNascimento: text })}
          border={editMode}
          label="Descrição da consulta:"
          placeholder="Descrição da consulta:"
        />

        <Input
          inputValue={inputs.cpf}
          onChange={(text) => setInputs({ ...inputs, cpf: text })}
          border={editMode}
          label="Diagnóstico do paciente:"
          placeholder="Diagnóstico do paciente"
        />

        <Input
          height={100}
          inputValue={inputs.endereco}
          onChange={(text) => setInputs({ ...inputs, endereco: text })}
          border={editMode}
          label="Prescrição médica:"
          placeholder="Prescrição médica"
        />
        <Group gap={10}>
          <Button
            onPress={() => setEditMode(!editMode)}
            text={editMode ? "SALVAR" : "EDITAR"}
          />

          <Button outlined text="SAIR DO APP" />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
