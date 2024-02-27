import { PacienteImage } from "../../components/PacienteImage";
import {
  ContainerScroll,
  ContainerSpacing,
} from "../../components/Container";
import { Title } from "../../components/Title";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Group } from "../../components/Group";
import { Button } from "../../components/Button";
import { useState } from "react";

export const PacientePerfil = () => {
  const [editMode, setEditMode] = useState(false);

  const [inputs, setInputs] = useState({
    dataNascimento: "",
    cpf: "",
    endereco: "",
    cep: "",
    cidade: "",
  });

  return (
    <ContainerScroll
      contentContainerStyle={{
        alignItems: "center",
        gap: 20,
        paddingBottom: 20,
      }}
    >
      <PacienteImage source={require("./../../assets/img/UserImage.jpg")} />

      <ContainerSpacing>
        <Title text={"Romário"} />

        <Subtitle text="romario@email.com" />

        <Input
          inputValue={inputs.dataNascimento}
          onChange={(text) => setInputs({ ...inputs, dataNascimento: text })}
          border={editMode}
          label="Data de nascimento:"
          placeholder="04/05/1999"
        />

        <Input
          inputValue={inputs.cpf}
          onChange={(text) => setInputs({ ...inputs, cpf: text })}
          border={editMode}
          label="CPF"
          placeholder="859********"
        />

        <Input
          inputValue={inputs.endereco}
          onChange={(text) => setInputs({ ...inputs, endereco: text })}
          border={editMode}
          label="Endereço"
          placeholder="Rua Vicenso Silva, 987"
        />

        <Group gap={20} row={window.innerWidth <= 350 ? false : true}>
          <Input
            inputValue={inputs.cep}
            onChange={(text) => setInputs({ ...inputs, cep: text })}
            border={editMode}
            label="Cep"
            placeholder="06548-909"
          />

          <Input
            inputValue={inputs.cidade}
            onChange={(text) => setInputs({ ...inputs, cidade: text })}
            border={editMode}
            label="Cidade"
            placeholder="Moema-SP"
          />
        </Group>
        <Group gap={10}>
          <Button
            onPress={() => setEditMode(!editMode)}
            text={editMode ? "SALVAR" : "EDITAR"}
          />

          <Button outlined text="SAIR DO APP" />
        </Group>
      </ContainerSpacing>
    </ContainerScroll>
  );
};
