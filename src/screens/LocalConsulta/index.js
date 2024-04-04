import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "../../components/Title/index";
import { Subtitle } from "../../components/Subtitle/index";
import { Input } from "../../components/Input/index";
import { Maps } from "../../components/Maps";
import { ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import api from "../../service/service";

export const LocalConsulta = ({ navigation, route }) => {
  const [clinica, setClinica] = useState(null);

  async function getClinica() {
    try {
      const response = await api.get(
        "/Clinica/BuscarPorId?id=" + route.params.clinicaId
      );
      setClinica(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (clinica == null) {
      getClinica();
    }
  }, [clinica]);

  return clinica != null ? (
    <>
      <Maps clinica={clinica} />
      <ContainerScroll contentContainerStyle={{ paddingBottom: 20 }}>
        <ContainerSpacing style={{ paddingTop: 20 }}>
          <Title text={clinica.nomeFantasia} />
          <Subtitle text={clinica.endereco.cidade} />
          <Input
            border={false}
            label="Endereço"
            inputValue={clinica.endereco.logradouro}
          />
          <Input
            border={false}
            label="Número"
            inputValue={clinica.endereco.numero.toString()}
          />
          <Input
            border={false}
            label="Bairro"
            inputValue={clinica.endereco.cep}
          />
        </ContainerSpacing>
      </ContainerScroll>
    </>
  ) : (
    <ActivityIndicator />
  );
};
