import {
  ContainerSafe,
  ContainerScroll,
  ContainerSpacing,
} from "../../components/Container";
import { HeaderConsultas } from "./../../components/HeaderConsultas/index";
import { Calendar } from "./../../components/Calendar/index";
import { Button } from "./../../components/Button/index";
import { Group } from "./../../components/Group/index";
import { useState } from "react";
import { CardConsulta } from "../../components/CardConsulta";

export const ConsultasCliente = ({ navigation }) => {
  const [statusButtons, setStatusButtons] = useState("Agendadas");

  const [consultas] = useState([
    {
      id: 1,
      nome: "Romário",
      idade: 32,
      categoria: "Cardiologista",
      horario: "12:00",
      status: "Agendada",
    },
    {
      id: 2,
      nome: "Romário",
      idade: 32,
      categoria: "Cardiologista",
      horario: "12:00",
      status: "Agendada",
    },
    {
      id: 3,
      nome: "Romário",
      idade: 32,
      categoria: "Cardiologista",
      horario: "12:00",
      status: "Agendada",
    },
    {
      id: 4,
      nome: "Romário",
      idade: 32,
      categoria: "Cardiologista",
      horario: "12:00",
      status: "Agendada",
    },
    {
      id: 5,
      nome: "Romário",
      idade: 32,
      categoria: "Urologista",
      horario: "14:00",
      status: "Realizada",
    },
    {
      id: 6,
      nome: "Romário",
      idade: 32,
      categoria: "Oftalmologista",
      horario: "16:00",
      status: "Cancelada",
    },
  ]);

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

        <ContainerScroll
          contentContainerStyle={{
            alignItems: "center",
            gap: 10,
            flex: 1
          }}
        >
          {consultas
            .filter(
              (consulta) => consulta.status === statusButtons.replace("as", "a")
            )
            .map((consulta) => (
              <CardConsulta
                key={consulta.id}
                image={require("./../../assets/img/UserImage.jpg")}
                name={consulta.nome}
                idade={consulta.idade}
                categoria={consulta.categoria}
                horario={consulta.horario}
                situacao={consulta.status}
              />
            ))}
        </ContainerScroll>
      </ContainerSpacing>
    </ContainerSafe>
  );
};
