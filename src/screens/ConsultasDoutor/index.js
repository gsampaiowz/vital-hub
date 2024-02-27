import { ContainerSafe, ContainerSpacing } from "../../components/Container";
import { HeaderConsultas } from "../../components/HeaderConsultas/index";
import { Calendar } from "../../components/Calendar/index";
import { Button } from "../../components/Button/index";
import { Group } from "../../components/Group/index";
import { useState } from "react";
import { CardConsulta } from "../../components/CardConsulta";
import { ListComponent } from "../../components/CardList";
import { MyModal } from "../../components/Modal/index";

export const ConsultasDoutor = ({ navigation }) => {
  const [statusButtons, setStatusButtons] = useState("Agendadas");

  const [consultas] = useState([
    {
      id: 1,
      nome: "Romário",
      idade: 32,
      categoria: "Cardiologista",
      horario: "12:00",
      status: "Agendadas",
    },
    {
      id: 2,
      nome: "Romário",
      idade: 32,
      categoria: "Cardiologista",
      horario: "12:00",
      status: "Agendadas",
    },
    {
      id: 3,
      nome: "Romário",
      idade: 32,
      categoria: "Cardiologista",
      horario: "12:00",
      status: "Agendadas",
    },
    {
      id: 4,
      nome: "Romário",
      idade: 32,
      categoria: "Cardiologista",
      horario: "12:00",
      status: "Agendadas",
    },
    {
      id: 5,
      nome: "Romário",
      idade: 32,
      categoria: "Urologista",
      horario: "14:00",
      status: "Realizadas",
    },
    {
      id: 6,
      nome: "Romário",
      idade: 32,
      categoria: "Oftalmologista",
      horario: "16:00",
      status: "Canceladas",
    },
  ]);

  const [showModalCancel, setShowModalCancel] = useState(false);

  const [showModalProntuario, setShowModalProntuario] = useState(false);

  return (
    <ContainerSafe>
      <HeaderConsultas
        image={require("./../../assets/img/UserImage.jpg")}
        nome={"Romário"}
      />
      <Calendar />

      <ContainerSpacing>
        <Group row>
          <Button
            clickButton={statusButtons === "Agendadas"}
            onPress={() => setStatusButtons("Agendadas")}
            fontSize={12}
            text="Agendadas"
          />
          <Button
            clickButton={statusButtons === "Realizadas"}
            onPress={() => setStatusButtons("Realizadas")}
            fontSize={12}
            text="Realizadas"
          />
          <Button
            clickButton={statusButtons === "Canceladas"}
            onPress={() => setStatusButtons("Canceladas")}
            fontSize={12}
            text="Canceladas"
          />
        </Group>
      </ContainerSpacing>

      <ListComponent
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          statusButtons === item.status && (
            <CardConsulta
              image={require("./../../assets/img/UserImage.jpg")}
              name={item.nome}
              idade={item.idade}
              setShowModalCancel={setShowModalCancel}
              setShowModalProntuario={setShowModalProntuario}
              categoria={item.categoria}
              horario={item.horario}
              situacao={item.status}
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
    </ContainerSafe>
  );
};