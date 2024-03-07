import styled from "styled-components/native";
import { ContainerSafe, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title/index";
import { Subtitle } from "../../components/Subtitle/index";
import { Input } from "../../components/Input/index";

const MapsImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 50px;
`;

export const LocalConsulta = () => {
  return (
    <>
      <MapsImage source={require("./../../assets/img/maps.png")} />
      <ContainerSafe>
        <ContainerSpacing style={{paddingTop: 20}}>
          <Title text="Clinica" />
          <Subtitle text="São Paulo, SP" />
          <Input
            border={false}
            label="Endereço"
            inputValue="Rua Vicenso Silva, 987"
          />
          <Input border={false} label="Número" inputValue="578" />
          <Input border={false} label="Bairro" inputValue="Moema-SP" />
        </ContainerSpacing>
      </ContainerSafe>
    </>
  );
};
