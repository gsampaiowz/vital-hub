import { ClienteImage } from "../../components/ClienteImage";
import { ContainerScroll } from "./../../components/Container";
import { Title } from "./../../components/Title";
import { Subtitle } from "./../../components/Subtitle";
import { Group } from "../../components/Group";

export const PerfilCliente = ({ navigation }) => {
  return (
    <ContainerScroll contentContainerStyle={{ alignItems: "center", gap: 20 }}>
      {/* <NavigationButton
        onPress={() => navigation.navigate("Home")}
        content={<AntDesign name="close" size={24} color="#34898f" />}
      /> */}

      <ClienteImage
        source={require("./../../assets/img/UserImage.png")}
      />

      <Title text={"Fulano de Tal"} />

      <Subtitle text="fulanodetal@email.com" />

      
    </ContainerScroll>
  );
};
