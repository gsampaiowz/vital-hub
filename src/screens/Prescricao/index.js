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
import { ActivityIndicator, FlatList } from "react-native";

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #8c8a97;
  margin: 10px 0;
`;

const InputImage = styled.Image`
  height: 500px;
  border-radius: 20px;
`;

const ImagePress = styled.TouchableOpacity`
  width: 100%;
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
    return () => {
      getConsulta();
    };
  }, []);

  useEffect(() => {
    getConsulta();
    setInputs({
      ...inputs,
      exame: descricaoExame,
    });
  }, [photo]);

  async function getConsulta() {
    try {
      await api
        .get("Consultas/BuscarPorId?id=" + consultaId)
        .then((response) => {
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
              <ImagePress onPress={() => setModalOpen(true)}>
                <InputImage source={{ uri: photo }} />
              </ImagePress>
            </>
          ) : (
            <Input
              height={100}
              border={editMode}
              label="Exames médicos:"
              icon={
                descricaoExame == "" ? (
                  <AntDesign
                    name="exclamationcircleo"
                    size={24}
                    color="#4E4B59"
                  />
                ) : null
              }
              placeholder={
                descricaoExame == ""
                  ? "Nenhuma foto informada"
                  : "Exame já informado!"
              }
            />
          )}
          <Button
            onPress={() => {
              setInCamera(true);
              setModalOpen(true);
            }}
            text={photo != null ? "Trocar" : "Enviar"}
            icon={<Feather name="camera" size={18} color="white" />}
          />
        </>

        <Divider />

        <Subtitle bold text="Resultado do exame:" />
        <Subtitle
          text={
            descricaoExame != ""
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
        setDescricaoExame={setDescricaoExame}
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
