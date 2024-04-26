import React, { useEffect, useState } from "react";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "./../../components/Title/index";
import { ListComponent } from "../../components/CardList";
import { CardMedClini } from "../../components/CardMedClini";
import { Button } from "./../../components/Button/index";
import { Group } from "./../../components/Group/index";
import api from "../../service/service";

export const SelecionarClinica = () => {
  const [clinicas, setClinicas] = useState([]);

  useEffect(() => {
    getClinicas();
  }, []);

  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);

  async function getClinicas() {
    try {
      const response = await api.get("/Clinica/ListarTodas");
      setClinicas(response.data);
    } catch (error) {
      console.log(error);
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
            clinica
            name={item.nomeFantasia}
            desc={item.endereco.cidade}
            aberto={"SEG - SEX"}
            estrelas={2}
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
    </ContainerScroll>
  );
};
