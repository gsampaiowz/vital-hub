import React, { useEffect, useState } from "react";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "./../../components/Title/index";
import { ListComponent } from "../../components/CardList";
import { CardMedClini } from "../../components/CardMedClini";
import { Button } from "./../../components/Button/index";
import { Group } from "./../../components/Group/index";
import api from "../../service/service";

export const SelecionarClinica = ({ route, navigation }) => {
  const [clinicas, setClinicas] = useState([]);

  useEffect(() => {
    getClinicas();
  }, []);

  const [clinica, setClinica] = useState({
    clinicaId: "",
    clinicaLabel: "",
  });

  async function getClinicas() {
    try {
      const response = await api.get(
        `/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`
      );

      setClinicas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function Continue() {
    if (clinica.clinicaId != "") {
      navigation.navigate("SelecionarMedico", {
        agendamento: {
          ...route.params.agendamento,
          ...clinica,
          getConsultas: route.params.getConsultas,
        },
      });
    }
  }

  return (
    <ContainerScroll style={{ paddingTop: 20 }}>
      <Title text="Selecionar Clínica" />
      <ListComponent
        data={clinicas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMedClini
            clinica={clinica}
            isClinica
            clinicaSelecionada={item}
            setClinica={setClinica}
            name={item.nomeFantasia}
            desc={item.endereco.cidade}
            aberto={"SEG - SEX"}
            estrelas={5}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <ContainerSpacing>
        <Group gap={10}>
          <Button text="Continuar" onPress={() => Continue()} />

          <Button outlined text="Voltar" onPress={() => navigation.goBack()} />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
