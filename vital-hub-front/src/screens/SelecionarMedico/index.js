import React, { useEffect, useState } from "react";
import { ContainerSafe, ContainerSpacing } from "../../components/Container";
import { Title } from "./../../components/Title/index";
import { ListComponent } from "../../components/CardList";
import { CardMedClini } from "../../components/CardMedClini";
import { Button } from "./../../components/Button/index";
import { Group } from "./../../components/Group/index";
import api from "../../service/service";
import ToastManager, { Toast } from "toastify-react-native";

export const SelecionarMedico = ({ route, navigation }) => {
  //STATE DA LISTA DE MEDICOS
  const [medicoLista, setMedicoLista] = useState([]);

  //BUSCA MEDICOS AO INICIAR
  useEffect(() => {
    ListarMedicos();
  }, []);

  //FUNCTION PARA BUSCAR MEDICOS
  async function ListarMedicos() {
    //Instanciar a nossa conexão da API

    await api
      .get(
        "/Medicos/BuscarPorIdClinica?id=" + route.params.agendamento.clinicaId
      )
      .then((response) => {
        setMedicoLista(response.data);
      })
      .catch((error) => console.log(error));
  }

  //STATE PRA PASSAR NO ROUTE
  const [medico, setMedico] = useState({
    medicoClinicaId: "",
    medicoLabel: "",
    medicoEspecialidade: "",
  });

  //FUNCTION QUE NAVEGA PASSANDO OS DADOS NO ROUTE
  function Continue() {
    if (medico.medicoClinicaId != "") {
      navigation.navigate("SelecionarData", {
        agendamento: {
          ...route.params.agendamento,
          ...medico,
        },
      });
    } else {
      Toast.error("Selecione um medico");
    }
  }

  return (
    <ContainerSafe>
      <ToastManager height={60} width={300} />
      <Title text="Selecionar Médico" />
      <ListComponent
        data={medicoLista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMedClini
            medico={medico}
            setMedico={setMedico}
            medicoSelecionado={item}
            name={item.idNavigation.nome}
            desc={item.especialidade.especialidade1}
            image={require("./../../assets/img/UserImage.jpg")}
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
