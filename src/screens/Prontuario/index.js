import { PacienteImage } from "../../components/PacienteImage";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import moment from "moment";
import api from "./../../service/service";

export const Prontuario = ({ route }) => {
  const [editMode, setEditMode] = useState(false);

  const [inputs, setInputs] = useState({
    descricao: "",
    diagnostico: "",
    prescricao: "",
  });

  const [consulta, setConsulta] = useState({});

  const user = route.params.user;

  const consultaId = route.params.consultaId;

  const [dados, setDados] = useState({
    nome: "",
    info: "",
    email: "",
  });

  useEffect(() => {
    getConsulta();
  }, []);

  async function getConsulta() {
    try {
      console.log("começo");
      await api
        .get("Consultas/BuscarPorId?id=" + consultaId)
        .then((response) => {
          console.log(response.data);
          setInputs({
            ...inputs,
            descricao: response.data.descricao,
            diagnostico: response.data.diagnostico,
            prescricao:
              "Observado: " +
              response.data.receita.observacoes +
              "\nMedicamento: " +
              response.data.receita.medicamento,
          });

          if (user.role === "paciente") {
            setDados({
              nome: response.data.medicoClinica.medico.idNavigation.nome,
              email: response.data.medicoClinica.medico.idNavigation.email,
              info: response.data.medicoClinica.medico.crm,
            });
          } else {
            setDados({
              nome: response.data.paciente.idNavigation.nome,
              email: response.data.paciente.idNavigation.email,
              info: moment().diff(
                new Date(response.data.paciente.dataNascimento),
                "years"
              ),
            });
          }
          setConsulta(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProntuario() {
    const prescricao = inputs.prescricao.split("\n");
    try {
      await api.put("Consultas/Prontuario", {
        id: consulta.id,
        situacaoId: consulta.situacaoId,
        pacienteId: consulta.pacienteId,
        medicoClinicaId: consulta.medicoClinicaId,
        receitaId: consulta.receitaId,
        prioridadeId: consulta.prioridadeId,
        dataConsulta: consulta.dataConsulta,
        diagnostico: inputs.diagnostico,
        descricao: inputs.descricao,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ContainerScroll>
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
        <Title text={dados.nome} />

        <Group row>
          <Subtitle text={dados.info + " anos"} />
          <Subtitle bold text={dados.email} />
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
            onPress={() => {
              setEditMode(!editMode);
              editMode && updateProntuario();
            }}
            text={editMode ? "SALVAR" : "EDITAR"}
          />

          <Button outlined text="SAIR DO APP" />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
