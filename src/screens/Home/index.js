import { ContainerSafe, ContainerSpacing } from "../../components/Container";
import { HeaderConsultas } from "../../components/HeaderConsultas/index";
import { Calendar } from "../../components/Calendar/index";
import { Button } from "../../components/Button/index";
import { useFocusEffect } from "@react-navigation/native";
import { Group } from "../../components/Group/index";
import { useCallback, useEffect, useState } from "react";
import { CardConsulta } from "../../components/CardConsulta";
import { ListComponent } from "../../components/CardList";
import { MyModal } from "../../components/Modal/index";
import { AddConsulta } from "../../components/AddConsulta/index";
import { Fontisto } from "@expo/vector-icons";
import { ModalAddConsulta } from "../../components/ModalAddConsulta";
import { userDecodeToken } from "../../utils/Auth";
import api from "../../service/service";
import moment from "moment/moment";

export const Home = ({ navigation }) => {
  
  //STATE DE SITUACAO DE CONSULTA
  const [statusButtons, setStatusButtons] = useState("agendadas");

  //STATE DA DATA DO CALENDAR STRIP
  const [data, setData] = useState(moment());

  //STATE DAS CONSULTAS
  const [consultas, setConsultas] = useState([]);

  //STATE DE VISIBILIDADE DO MODAL DE CADASTRAR CONSULTA
  const [showModalConsulta, setShowModalConsulta] = useState(false);

  //STATE PARA PASSAR PROPS PARA OS MODAIS
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  //STATE DE VISIBILIDADE DO MODAL DE CANCELAR CONSULTA
  const [showModalCancel, setShowModalCancel] = useState(false);

  //STATE DE VISIBILIDADE DO MODAL DE ACESSAR O PRONTUARIO
  const [showModalProntuario, setShowModalProntuario] = useState(false);

  //STATE DO USUARIO (TOKEN)
  const [user, setUser] = useState({});

  //FUNÇÃO QUE BUSCA AS CONSULTAS DO USUARIO
  async function getConsultas() {
    try {
      const responseUser = await userDecodeToken();
      const url = responseUser.role === "paciente" ? "Pacientes" : "Medicos";
      const response = await api.get(
        `/${url}/BuscarPorData?data=${new Date(data)
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-")}&id=${responseUser.id}`
      );
      setConsultas(response.data);
      console.log(consultas);
    } catch (error) {
      console.log(error);
    }
  }

  //BUSCA AS CONSULTAS AO INICIAR E AO MUDAR A DATA
  useEffect(() => {
    ExpirarConsultas();
  }, [data]);

  //BUSCA AS CONSULTAS AO VOLTAR A TELA HOME
  useFocusEffect(
    useCallback(() => {
      ExpirarConsultas();
    }, [])
  );

  //FUNÇÃO QUE ATUALIZA AS CONSULTAS AGENDADAS PARA REALIZADAS AO EXPIRAR A DATA DA CONSULTA
  async function ExpirarConsultas() {
    try {
      //BUSCA AS CONSULTAS
      await getConsultas();
      //PERCORRE AS CONSULTAS E VERIFICA SE A DATA DA CONSULTA E MENOR QUE A DATA ATUAL
      consultas.forEach(async (consulta) => {
        if (
          new Date(consulta.dataConsulta) < new Date() &&
          consulta.situacaoId == "8240e2bc-531c-46a4-9361-36d3bcef2b6d"
        ) {
          //ATUALIZA A CONSULTA PARA STATUS REALIZADAS
          await api
            .put(
              `/Consultas/Status?idConsulta=${consulta.id}&status=realizadas`
            )
            .then(async () => {
              //BUSCA NOVAMENTE AS CONSULTAS
              await getConsultas();
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  //FUNÇÃO QUE CARREGA OS DADOS DO USUARIO (TOKEN)
  async function ProfileLoad() {
    setUser(await userDecodeToken());
  }

  //CARREGA DOS DADOS DO USUARIO AO INICIAR
  useEffect(() => {
    ProfileLoad();
  }, []);

  return (
    <ContainerSafe style={{ paddingTop: 0 }}>
      <HeaderConsultas image={{ uri: user.foto }} />
      <Calendar data={data} setData={setData} />

      <ContainerSpacing>
        <Group row>
          <Button
            clickButton={statusButtons === "agendadas"}
            onPress={() => setStatusButtons("agendadas")}
            fontSize={12}
            text="Agendadas"
          />
          <Button
            clickButton={statusButtons === "realizadas"}
            onPress={() => setStatusButtons("realizadas")}
            fontSize={12}
            text="Realizadas"
          />
          <Button
            clickButton={statusButtons === "canceladas"}
            onPress={() => setStatusButtons("canceladas")}
            fontSize={12}
            text="Canceladas"
          />
        </Group>
      </ContainerSpacing>

      {/* COMPONENTE QUE RENDERIZA AS CONSULTAS EM FORMA DE LISTA */}
      <ListComponent
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          statusButtons === item.situacao.situacao && (
            //CARD DE CONSULTA QUE PASSA OS DADOS COM TERNARIOS ENTRE TIPOS DE USUARIO
            <CardConsulta
              clinica={item.medicoClinica.clinicaId}
              navigation={navigation}
              onPress={setConsultaSelecionada(item)}
              user={user}
              image={require("./../../assets/img/UserImage.jpg")}
              name={
                user.role === "paciente"
                  ? item.medicoClinica.medico.idNavigation.nome
                  : item.paciente.idNavigation.nome
              }
              info={
                user.role === "paciente"
                  ? item.medicoClinica.medico.crm
                  : moment().diff(
                      new Date(item.paciente.dataNascimento),
                      "years"
                    )
              }
              setShowModalCancel={setShowModalCancel}
              setShowModalProntuario={setShowModalProntuario}
              prioridade={item.prioridade.prioridade}
              horario={new Date(item.dataConsulta).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              situacao={item.situacao.situacao}
            />
          )
        }
        showsVerticalScrollIndicator={false}
      />

      {/* MODAL DE CANCELAMENTO */}
      <MyModal
        item={consultaSelecionada}
        cancel
        getConsultas={getConsultas}
        user={user}
        setShowModal={setShowModalCancel}
        visible={showModalCancel}
      />
      {/* MODAL DE PRONTUÁRIO/PRESCRICAO */}
      <MyModal
        user={user}
        navigation={navigation}
        item={consultaSelecionada}
        image={require("./../../assets/img/UserImage.jpg")}
        setShowModal={setShowModalProntuario}
        visible={showModalProntuario}
      />
      {/* BOTAO PARA ABRIR O MODAL DE ADICIONAR CONSULTA, VISIVEL SOMENTE PARA PACIENTES */}
      {user.role === "medico" ? null : (
        <AddConsulta onPress={() => setShowModalConsulta(true)}>
          <Fontisto name="stethoscope" size={24} color="white" />
        </AddConsulta>
      )}
      {/* MODAL DE ADICIONAR CONSULTA */}
      {showModalConsulta && (
        <ModalAddConsulta
          getConsultas={getConsultas}
          navigation={navigation}
          setShowModalConsulta={setShowModalConsulta}
          visible={showModalConsulta}
        />
      )}
    </ContainerSafe>
  );
};
