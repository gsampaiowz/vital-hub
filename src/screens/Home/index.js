import { ContainerSafe, ContainerSpacing } from "../../components/Container";
import { HeaderConsultas } from "../../components/HeaderConsultas/index";
import { Calendar } from "../../components/Calendar/index";
import { Button } from "../../components/Button/index";
import { Group } from "../../components/Group/index";
import { useEffect, useState } from "react";
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
  const [statusButtons, setStatusButtons] = useState("agendadas");

  const [data, setData] = useState(moment());

  const [consultas, setConsultas] = useState([]);

  const [showModalConsulta, setShowModalConsulta] = useState(false);

  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const [showModalCancel, setShowModalCancel] = useState(false);

  const [showModalProntuario, setShowModalProntuario] = useState(false);

  const [user, setUser] = useState({});

  async function getConsultas() {
    const url = user.role === "paciente" ? "Pacientes" : "Medicos";

    try {
      const response = await api.get(
        `/${url}/BuscarPorData?data=${new Date(data)
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-")}&id=${user.id}`
      );
      setConsultas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getConsultas();
  }, [data]);

  useEffect(() => {
    ProfileLoad();
  }, [userDecodeToken()]);

  async function ProfileLoad() {
    setUser(await userDecodeToken());
  }

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

      <ListComponent
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          statusButtons === item.situacao.situacao && (
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

      <MyModal
        item={consultaSelecionada}
        cancel
        getConsultas={getConsultas}
        user={user}
        setShowModal={setShowModalCancel}
        visible={showModalCancel}
      />
      <MyModal
        user={user}
        navigation={navigation}
        item={consultaSelecionada}
        image={require("./../../assets/img/UserImage.jpg")}
        setShowModal={setShowModalProntuario}
        visible={showModalProntuario}
      />
      {user.role === "medico" ? null : (
        <AddConsulta onPress={() => setShowModalConsulta(true)}>
          <Fontisto name="stethoscope" size={24} color="white" />
        </AddConsulta>
      )}
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
