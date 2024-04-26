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
import { CameraModal } from "../../components/CameraModal";
import { MyCamera } from "./../../components/MyCamera/index";
import moment from "moment";
import api from "../../service/service";
import { Dimensions } from "react-native";
import { ActivityIndicator } from "react-native";

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

export const Prescricao = () => {
  const [editMode, setEditMode] = useState(false);

  const [inputs, setInputs] = useState({
    descricao: "",
    diagnostico: "",
    medicamento: "",
    exame: "",
  });

  const [inCamera, setInCamera] = useState(false);

  const [consulta, setConsulta] = useState({});

  const [descricaoExame, setDescricaoExame] = useState("");

  const [photo, setPhoto] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [isPhotoSaved, setIsPhotoSaved] = useState(false);

  const user = route.params.user;

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
          console.log(consultaId);
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
          setDescricaoExame(response.data.exames[0].descricao);
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
          <Subtitle text={info + " anos"} />
          <Subtitle bold text={email} />
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
          inputValue={inputs.prescricao}
          onChange={(text) => setInputs({ ...inputs, prescricao: text })}
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
                <AntDesign
                  name="exclamationcircleo"
                  size={24}
                  color="#4E4B59"
                />
              }
              placeholder={"Nenhuma foto informada"}
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

        <Input
          border={false}
          height={100}
          inputValue={descricaoExame}
          placeholder="Resultado do exame de sangue : tudo normal"
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
