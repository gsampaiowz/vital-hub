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

  const [showModalCancel, setShowModalCancel] = useState(false);

  const [showModalProntuario, setShowModalProntuario] = useState(false);

  const [user, setUser] = useState({});

  async function getConsultas() {
    try {
      const response = await api.get(
        `/Pacientes/BuscarPorData?data=${new Date(data)
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-")}&id=${user.id}`
      );
      setConsultas(response.data);
      console.log(response.data);
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
      <HeaderConsultas image={{uri : user.foto}} />
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
              user={user}
              image={require("./../../assets/img/UserImage.jpg")}
              name={item.medicoClinica.medico.idNavigation.nome}
              idade={
                item.prioridade.prioridade === 0
                  ? "Exame"
                  : item.prioridade.prioridade === 1
                  ? "Rotina"
                  : "Urgência"
              }
              setShowModalCancel={setShowModalCancel}
              setShowModalProntuario={setShowModalProntuario}
              categoria={item.categoria}
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
        cancel
        setShowModal={setShowModalCancel}
        visible={showModalCancel}
      />
      <MyModal
        nome={"Romário"}
        email={"romario@email.com"}
        idade={32}
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
          navigation={navigation}
          setShowModalConsulta={setShowModalConsulta}
          visible={showModalConsulta}
        />
      )}
    </ContainerSafe>
  );
};
