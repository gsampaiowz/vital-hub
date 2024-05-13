import { PacienteImage } from "../../components/PacienteImage";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { CameraModal } from "../../components/CameraModal";
import { MyCamera } from "./../../components/MyCamera/index";
import moment from "moment";
import api from "../../service/service";
import { ActivityIndicator } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #8c8a97;
  margin: 10px 0;
`;

const InputImage = styled.Image`
  height: 500px;
  width: 100%;
  border-radius: 20px;
`;

export const Prescricao = ({ route }) => {
  const [editMode, setEditMode] = useState(false);

  const [inputs, setInputs] = useState({
    descricao: "",
    diagnostico: "",
    medicamento: "",
  });

  const [inCamera, setInCamera] = useState(false);

  const [consulta, setConsulta] = useState({});

  const [exames, setExames] = useState([]);

  const [descricaoExame, setDescricaoExame] = useState("");

  const [photo, setPhoto] = useState(null);


  const [modalOpen, setModalOpen] = useState(false);

  const [isPhotoSaved, setIsPhotoSaved] = useState(false);

  const consultaId = route.params.consulta.id;

  const [dados, setDados] = useState({
    nome: "",
    info: "",
    email: "",
    foto: "",
  });

  useEffect(() => {
    getConsulta();
  }, [photo, modalOpen, inCamera]);

  const examesSemRepetir = new Set();

  async function getConsulta() {
    try {
      await api
        .get("Consultas/BuscarPorId?id=" + consultaId)
        .then(async (response) => {
          setInputs({
            ...inputs,
            descricao: response.data.descricao,
            diagnostico: response.data.diagnostico,
            medicamento: response.data.receita.medicamento,
          });

          setDados({
            nome: response.data.paciente.idNavigation.nome,
            email: response.data.paciente.idNavigation.email,
            info: moment().diff(
              new Date(response.data.paciente.dataNascimento),
              "years"
            ),
            foto: response.data.paciente.idNavigation.foto,
          });

          setConsulta(response.data);


          setExames([]);

          response.data.exames.forEach(async (exame) => {
            if (examesSemRepetir.has(exame.descricao)) {
              try {
                await api.delete("/Exame?id=" + exame.id);
              } catch (error) {
                console.log(error);
              }
              return;
            }
            examesSemRepetir.add(exame.descricao);
          });


          Array.from(examesSemRepetir).forEach((exame, index) => {
            setExames((prevExames) => [
              ...prevExames,
              { label: `Exame ${index + 1}`, value: exame },
            ]);
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProntuario() {
    try {
      await api.put("Consultas/Prontuario", {
        ConsultaId: consulta.id,
        diagnostico: inputs.diagnostico,
        descricao: inputs.descricao,
        medicamento: inputs.medicamento,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return inCamera ? (
    <MyCamera
      getMediaLibrary={true}
      setModalOpen={setModalOpen}
      setInCamera={setInCamera}
      setPhoto={setPhoto}
      setIsPhotoSaved={setIsPhotoSaved}
    />
  ) : dados.email !== "" ? (
    <ContainerScroll>
      <PacienteImage source={{ uri: dados.foto }} />
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
          inputValue={inputs.medicamento}
          onChange={(text) => setInputs({ ...inputs, medicamento: text })}
          border={editMode}
          label="Prescrição médica:"
          placeholder="Prescrição médica"
        />
        <>
          {photo != null ? (
            <>
              <Subtitle bold text="Exame médico" />
              <InputImage source={{ uri: photo }} />
            </>
          ) : (
            <Input
              height={100}
              border={editMode}
              label="Exames médicos:"
              icon={
                exames.length < 1 ? (
                  <AntDesign
                    name="exclamationcircleo"
                    size={24}
                    color="#4E4B59"
                  />
                ) : null
              }
              placeholder="Enviar exames médicos"
            />
          )}
          <Button
            onPress={() => {
              setInCamera(true);
              setModalOpen(true);
            }}
            text={photo != null ? "Enviar outro" : "Enviar"}
            icon={<Feather name="camera" size={18} color="white" />}
          />
        </>

        <Divider />

        <Subtitle bold text="Resultado do exame:" />
        <RNPickerSelect
          onValueChange={(value) => setDescricaoExame(value)}
          items={exames}
          placeholder={{ label: "Selecione um exame", value: null }}
        />
        <Subtitle
          text={
            exames.length >= 1
              ? descricaoExame
              : "Nenhum exame informado ainda."
          }
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
      <CameraModal
        examesSemRepetir={examesSemRepetir}
        getConsulta={getConsulta}
        consultaId={consulta.id}
        isPhotoSaved={isPhotoSaved}
        setIsPhotoSaved={setIsPhotoSaved}
        setInCamera={setInCamera}
        setModalOpen={setModalOpen}
        visible={modalOpen}
        photoUri={photo}
      />
    </ContainerScroll>
  ) : (
    <ActivityIndicator style={{ height: "100%" }} />
  );
};
