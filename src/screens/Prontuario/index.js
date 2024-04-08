import { PacienteImage } from "../../components/PacienteImage";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import moment from "moment";

export const Prontuario = ({ route }) => {
  const [editMode, setEditMode] = useState(false);

  const [inputs, setInputs] = useState({
    descricao: "",
    diagnostico: "",
    prescricao: "",
  });

  const user = route.params.user;

  const consulta = route.params.consulta;

  let nome, info, email;

  if (user.role === "paciente") {
    nome = consulta.medicoClinica.medico.idNavigation.nome;
    email = consulta.medicoClinica.medico.idNavigation.email;
    info = consulta.medicoClinica.medico.crm;
  } else {
    nome = consulta.paciente.idNavigation.nome;
    email = consulta.paciente.idNavigation.email;
    info = moment().diff(new Date(consulta.paciente.dataNascimento), "years");
  }

  useEffect(() => {
    setInputs({
      ...inputs,
      descricao: consulta.descricao,
      diagnostico: consulta.diagnostico,
    });

    console.log(consulta);
  }, []);

  return (
    <ContainerScroll>
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
        <Title text={nome} />

        <Group row>
          <Subtitle text={info + " anos"} />
          <Subtitle bold text={email} />
        </Group>

        <Input
          height={100}
          inputValue={inputs.descricao}
          onChange={(text) => setInputs({ ...inputs, descricao: text })}
          border={editMode}
          label="Descrição da consulta:"
          placeholder="Descrição da consulta:"
        />

        <Input
          inputValue={inputs.diagnostico}
          onChange={(text) => setInputs({ ...inputs, diagnostico: text })}
          border={editMode}
          label="Diagnóstico do paciente:"
          placeholder="Diagnóstico do paciente"
        />

        <Input
          height={100}
          inputValue={inputs.prescricao}
          onChange={(text) => setInputs({ ...inputs, prescricao: text })}
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
