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
    prescricao: "",
  });

  const [inCamera, setInCamera] = useState(false);

  const [photo, setPhoto] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [isPhotoSaved, setIsPhotoSaved] = useState(false);

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
    info =
      new Date() -
      new Date(consulta.paciente.idNavigation.DataNascimento) +
      " Anos";
  }

  useEffect(() => {
    setInputs({
      ...inputs,
      descricao: consulta.descricao,
      diagnostico: consulta.diagnostico,
    });
  }, []);

  return inCamera ? (
    <MyCamera
      setInCamera={setInCamera}
      setPhoto={setPhoto}
      setIsPhotoSaved={setIsPhotoSaved}
    />
  ) : (
    <ContainerScroll>
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
        <Title text={nome} />

        <Group row>
          <Subtitle text={info} />
          <Subtitle text={email} />
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
            onPress={() => setInCamera(true)}
            text={photo != null ? "Trocar" : "Enviar"}
            icon={<Feather name="camera" size={18} color="white" />}
          />
        </>

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
      <CameraModal
        isPhotoSaved={isPhotoSaved}
        setIsPhotoSaved={setIsPhotoSaved}
        setInCamera={setInCamera}
        setModalOpen={setModalOpen}
        visible={modalOpen}
        photoUri={photo}
      />
    </ContainerScroll>
  );
};
