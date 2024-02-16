import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { HeaderConsultas } from "./../../components/HeaderConsultas/index";
import { Calendar } from "./../../components/Calendar/index";
import { Button } from "./../../components/Button/index";
import { Group } from "./../../components/Group/index";

export const ConsultasCliente = ({ navigation }) => {
  return (
    <ContainerScroll
      contentContainerStyle={{
        alignItems: "center",
        gap: 20,
      }}
    >
      <HeaderConsultas
        image={require("./../../assets/img/UserImage.jpg")}
        nome={"Romário"}
      />
      <Calendar />

      <ContainerSpacing>
        <Group row>
          <Button text="Agendadas" />
          <Button text="Realizadas" outlined />
          <Button text="Canceladas" outlined />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
