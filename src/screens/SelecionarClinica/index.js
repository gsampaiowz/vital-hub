import React, { useEffect, useState } from "react";
import { ContainerSafe, ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "./../../components/Title/index";
import { ListComponent } from "../../components/CardList";
import { CardMedClini } from "../../components/CardMedClini";
import { Button } from "./../../components/Button/index";
import { Group } from "./../../components/Group/index";
import api from "../../service/service";
import ToastManager, { Toast } from "toastify-react-native";

export const SelecionarClinica = ({ route, navigation }) => {
  //STATE DE CLINICAS
  const [clinicas, setClinicas] = useState([]);

  //BUSCA CLINICAS AO INICIAR
  useEffect(() => {
    getClinicas();
  }, []);

  //STATE PARA PASSAR PELO ROUTE
  const [clinica, setClinica] = useState({
    clinicaId: "",
    clinicaLabel: "",
  });

  //FUNCTION PARA BUSCAR CLINICAS
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

  //FUNCTION PARA NAVEGAR E PASSAR DADOS NO ROUTE
  function Continue() {
    if (clinica.clinicaId != "") {
      navigation.navigate("SelecionarMedico", {
        agendamento: {
          ...route.params.agendamento,
          ...clinica,
        },
      });
    } else {
      Toast.error("Selecione uma clinica");
    }
  }

  return (
    <ContainerSafe>
      <ToastManager height={60} width={300} />
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
    </ContainerSafe>
  );
};
