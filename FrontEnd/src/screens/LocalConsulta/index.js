import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title/index";
import { Subtitle } from "../../components/Subtitle/index";
import { Input } from "../../components/Input/index";
import { Maps } from "../../components/Maps";

export const LocalConsulta = () => {

  return (
    <>
      <Maps />
      <ContainerScroll contentContainerStyle={{ paddingBottom: 20 }}>
        <ContainerSpacing style={{ paddingTop: 20 }}>
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
      </ContainerScroll>
    </>
  );
};