import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title/index";
import { Subtitle } from "../../components/Subtitle/index";
import { Input } from "../../components/Input/index";
import { Maps } from "../../components/Maps";
import { useEffect, useState } from "react";
import api from "../../service/service";

export const LocalConsulta = () => {

  const [localization, setLocalization] = useState({})

  async function getLocalization() {
    try {
      const response = await api.get(`/Clinica/BuscarPorId?id=a28ff799-d20b-4c9e-9ba2-3075b9e08506`)
      setLocalization(await response.data)
      console.log(response.data.endereco.latitude)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getLocalization()
  }, [])

  return (
    <>
      <Maps
      localizacao={localization}
      />
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