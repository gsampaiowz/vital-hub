import React from "react";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Title } from "./../../components/Title/index";
import { ListComponent } from "../../components/CardList";
import { CardMedClini } from "../../components/CardMedClini";
import { Button } from "./../../components/Button/index";
import { Group } from "./../../components/Group/index";

export const SelecionarClinica = () => {
  const clinicas = [
    {
      id: 1,
      nome: "Clinica 1",
      local: "São Paulo, SP",
      aberto: "Seg-Sex",
      estrelas: 4.5,
    },
    {
      id: 2,
      nome: "Clinica 2",
      local: "São Paulo, SP",
      aberto: "Seg-Sab",
      estrelas: 5,
    },
    {
      id: 3,
      nome: "Clinica 3",
      local: "São Paulo, SP",
      aberto: "Seg-Sex",
      estrelas: 4,
    },
    {
      id: 4,
      nome: "Clinica 4",
      local: "São Paulo, SP",
      aberto: "Seg-Sex",
      estrelas: 3.5,
    },
    {
      id: 5,
      nome: "Clinica 5",
      local: "São Paulo, SP",
      aberto: "Seg-Sab",
      estrelas: 4.5,
    },
  ];

  return (
    <ContainerScroll style={{ paddingTop: 20 }}>
      <Title text="Selecionar Clínica" />
      <ListComponent
        data={clinicas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMedClini
            clinica
            name={item.nome}
            desc={item.local}
            aberto={item.aberto}
            estrelas={item.estrelas}
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
