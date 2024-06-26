import styled from "styled-components/native";
import { Modal } from "react-native";
import { Title } from "../Title";
import { Subtitle } from "../Subtitle/index";
import { Button } from "../Button";
import { Group } from "../Group";
import { ModalCancel } from "./../ModalCancel/index";
import { useState } from "react";
import api from "../../service/service";

const PatientModal = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);

  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.View`
  width: 90%;
  gap: 20px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;

  align-items: center;
`;

const ImageStyled = styled.Image`
  width: 260px;
  border-radius: 10px;
  height: 260px;
`;

export const ModalDetalhes = ({
  setShowDetalhesModal,
  user,
  item,
  navigation,
  getConsultas,
  clinica,
  name,
  prioridade,
  info,
  visible = false,
  ...rest
}) => {
  //STATE DE VISIBILIDADE DO MODAL DE CANCELAR CONSULTA
  const [showModalCancel, setShowModalCancel] = useState(false);

  async function realizarConsulta() {
    try {
      await api.put(
        `/Consultas/Status?idConsulta=${item.id}&status=realizadas`
      );
      setShowDetalhesModal(false);
      getConsultas();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal {...rest} transparent visible={visible} animationType="fade">
      <PatientModal>
        <ModalContent>
          <ImageStyled source={require("./../../assets/img/UserImage.jpg")} />
          <Title text={name} />
          <Group row>
            <Subtitle bold text={prioridade} />
            <Subtitle text={user.role === "paciente" ? info : info + " anos"} />
          </Group>
          <Group>
            {item.situacao.situacao == "realizadas" ||
            user.role == "medico" ? null : (
              <Button
                onPress={() => {
                  setShowDetalhesModal(false);
                  navigation.navigate("LocalConsulta", { clinicaId: clinica });
                }}
                text="VER LOCAL DA CONSULTA"
              />
            )}
            <Button
              onPress={() => {
                navigation.navigate("Prescricao", {
                  consulta: item,
                  situacao: item.situacao.situacao,
                });
                setShowDetalhesModal(false);
              }}
              text={
                user.role === "paciente"
                  ? "VER PRONTUÁRIO"
                  : "INSERIR PRONTUÁRIO"
              }
            />
            <Button
              borderColor="red"
              outlined
              color="red"
              onPress={() => setShowModalCancel(true)}
              text="CANCELAR CONSULTA"
            />
            {user.role == "medico" && item.situacao.situacao == "agendadas" ? (
              <Button
                onPress={() => realizarConsulta()}
                text="REALIZAR CONSULTA (para teste)"
              />
            ) : null}
            <Button
              onPress={() => setShowDetalhesModal(false)}
              outlined
              text="Voltar"
            />
          </Group>
        </ModalContent>
      </PatientModal>
      <ModalCancel
        navigation={navigation}
        getConsultas={getConsultas}
        setShowDetalhesModal={setShowDetalhesModal}
        setShowModal={setShowModalCancel}
        item={item}
        visible={showModalCancel}
      />
    </Modal>
  );
};
