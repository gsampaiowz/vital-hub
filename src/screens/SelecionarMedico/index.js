import React, { useEffect, useState } from "react";
import { ContainerSafe, ContainerSpacing } from "../../components/Container";
import { Title } from "./../../components/Title/index";
import { ListComponent } from "../../components/CardList";
import { CardMedClini } from "../../components/CardMedClini";
import { Button } from "./../../components/Button/index";
import { Group } from "./../../components/Group/index";
import api from "../../service/service";

export const SelecionarMedico = () => {
  const [medicoLista, setMedicoLista] = useState([]);

  useEffect(() => {
    ListarMedicos();
  }, []);

  async function ListarMedicos() {
    //Instanciar a nossa conexão da API

    await api
      .get("/Medicos")
      .then((response) => {
        setMedicoLista(response.data);
      })
      .catch((error) => console.log(error));

  }

  return (
    <ContainerSafe>
      <Title text="Selecionar Médico" />
      <ListComponent
        data={medicoLista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMedClini
            name={item.idNavigation.nome}
            desc={item.especialidade.especialidade1}
            image={require("./../../assets/img/UserImage.jpg")}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <ContainerSpacing>
        <Group gap={10}>
          <Button text="Continuar" />

          <Button outlined text="Cancelar" />
        </Group>
      </ContainerSpacing>
    </ContainerSafe>
  );
};
