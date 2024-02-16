import { ClienteImage } from "../../components/ClienteImage";
import {
  ContainerScroll,
  ContainerSpacing,
} from "./../../components/Container";
import { Title } from "./../../components/Title";
import { Subtitle } from "./../../components/Subtitle";
import { Input } from "./../../components/Input";
import { Group } from "./../../components/Group";
import { Button } from "./../../components/Button";

export const PerfilCliente = ({ navigation }) => {
  return (
    <ContainerScroll
      contentContainerStyle={{
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* <NavigationButton
        onPress={() => navigation.navigate("Home")}
        content={<AntDesign name="close" size={24} color="#34898f" />}
      /> */}

      <ClienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
        <Title text={"Romário"} />

        <Subtitle text="romario@email.com" />

        <Input label="Data de nascimento:" placeholder="04/05/1999" />

        <Input label="CPF" placeholder="859********" />

        <Input label="Endereço" placeholder="Rua Vicenso Silva, 987" />

        <Group gap={20} row={window.innerWidth <= 350 ? false : true}>
          <Input label="Cep" placeholder="06548-909" />

          <Input label="Cidade" placeholder="Moema-SP" />
        </Group>
        <Group gap={10}>
          <Button text="SALVAR" />

          <Button text="EDITAR" />

          <Button bgColor="#999999" text="SAIR DO APP" />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
