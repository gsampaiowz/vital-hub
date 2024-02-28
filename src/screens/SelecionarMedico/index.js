import React from "react";
import { ContainerSafe, ContainerSpacing } from "../../components/Container";
import { Title } from "./../../components/Title/index";
import { ListComponent } from "../../components/CardList";
import { CardMedClini } from "../../components/CardMedClini";
import { Button } from "./../../components/Button/index";
import { Group } from "./../../components/Group/index";

export const SelecionarMedico = () => {
  const medicos = [
    {
      id: 1,
      nome: "Médico 1",
      categoria: "Ortopedista, Esteticista",
    },
    {
      id: 2,
      nome: "Médico 2",
      categoria: "Demartológa, Esteticista",
    },
    {
      id: 3,
      nome: "Médico 3",
      categoria: "Pediatra, Clínico",
    },
    {
      id: 4,
      nome: "Médico 4",
      categoria: "Cirurgião, Cardiologista",
    },
    {
      id: 5,
      nome: "Médico 5",
      categoria: "Psicólogo",
    },
  ];

  return (
    <ContainerSafe style={{ paddingTop: 20 }}>
      <Title text="Selecionar Médico" />
      <ListComponent
        data={medicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMedClini
            name={item.nome}
            desc={item.categoria}
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
