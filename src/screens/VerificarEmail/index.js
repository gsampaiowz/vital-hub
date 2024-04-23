import { AntDesign } from "@expo/vector-icons";
import { NavigationButton } from "../../components/NavigationButton";
import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { Subtitle } from "../../components/Subtitle";
import { Title } from "../../components/Title";
import LogoImage from "../../assets/img/Logo.png";
import { Logo } from "../../components/Logo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "./../../components/Link/index";
import { Group } from "../../components/Group";
import { useRef, useState } from "react";
import api from "../../service/service";

export const VerificarEmail = ({ navigation, route }) => {

  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const [codigo, setCodigo] = useState('')

  function focusNextInput(index) {
    if (index < inputs.length - 1) {
      inputs[index + 1].current.focus()
    }
  }

  function focusPrevInput(index) {
    if (index > 0) {
      inputs[index - 1].current.focus()

    }
  }

  async function validarCodigo() {
    console.log(codigo);

    await api.post(`/RecuperarSenha/RotaDeRecuperacaoDeSenha?email=${route.params.emailRecuperacao}&recoveryCode=${codigo}`)
      .then(() => {
        navigation.replace("RedefinirSenha", { emailRecuperacao: route.params.emailRecuperacao });

      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <ContainerScroll>
      <ContainerSpacing>
        <NavigationButton
          onPress={() => navigation.navigate("Login")}
          content={<AntDesign name="close" size={24} color="#34898f" />}
        />

        <Logo source={LogoImage} />

        <Title text={"Verificar Email"} />

        <Subtitle
          text={
            <Group>
              <Subtitle text="Digite o código de 4 dígitos enviado para" />
              <Link
                underline={false}
                color="#496BBA"
                text={route.params.emailRecuperacao}
                // text=" username@email.com"
              />
            </Group>
          }
        />

        <Group row justifyContent="space-between">
          {/* <Input
            textAlign={"center"}
            width={60}
            height={60}
            fontSize={32}
            placeholder="0"
          /> */}

          {
            [0, 1, 2, 3].map((index) => (
              <Input
              inputValue={inputs[index]}
                key={index}
                ref={inputs[index]}

                textAlign={"center"}
                width={60}
                height={60}
                fontSize={32}
                placeholder="0"
                

                onChangeText={(txt) => {
                  //verificar se o campo é vazio
                  if (txt == "") {

                    // focusPrevInput(index)

                  } else {
                    //verificar se o campo foi preenchido
                    const codigoInformado = [... codigo]
                    codigoInformado[index] = txt
                    setCodigo(codigoInformado.join(""))

                    // focusNextInput(index)
                  }
                }}
              />
            ))
          }

          {/* <Input
            textAlign={"center"}
            width={60}
            height={60}
            fontSize={32}
            placeholder="0"
          />

          <Input
            textAlign={"center"}
            width={60}
            height={60}
            fontSize={32}
            placeholder="0"
          />

          <Input
            textAlign={"center"}
            width={60}
            height={60}
            fontSize={32}
            placeholder="0"
          /> */}
        </Group>
        <Button
          onPress={() => validarCodigo()}
          // onPress={() => navigation.navigate("RedefinirSenha")}
          text="Continuar"
        />
        <Link color="#344F8F" text="Reenviar código" />
      </ContainerSpacing>
    </ContainerScroll>
  );
};
