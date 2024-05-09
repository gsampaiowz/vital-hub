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
import React, { useRef, useState } from "react";
import api from "../../service/service";
import { ActivityIndicator } from "react-native";

export const VerificarEmail = ({ navigation, route }) => {
 
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const [codigo, setCodigo] = useState('')
  const [carregando, setCarregando] = useState(false);
  const handleInputRef = (ref, index) => {
    inputs[index] = ref;
  };
  function focusNextInput(index) {
    // Verificar se o index é menor do que a quantidade de campos
    if (index < inputs.length - 1) {
      inputs[index + 1].current?.focus()
    }
  }

  function focusPrevInput(index) { 
    // Verificar se o index é menor do que a quantidade de campos
    if (index > 0) {
      inputs[index - 1].current?.focus()
    }
  }

  // Requisição para validação do código de recuperação de email
  async function validarCodigo() {

    setCarregando(true)
    await api.post(`/RecuperarSenha/RotaDeRecuperacaoDeSenha?email=${route.params.emailRecuperacao}&recoveryCode=${codigo}`)

      .then(() => {
        navigation.replace("RedefinirSenha", { emailRecuperacao: route.params.emailRecuperacao });

      }).catch(error => {
        console.log(error);
      })
    setCarregando(false)
  }

  return (
    <ContainerScroll>
      <ContainerSpacing>
        <NavigationButton
          onPress={() => navigation.navigate("Login")}
          content={<AntDesign name="close" size={24} color="#34898f" />}
        />

        <Logo 
        source={LogoImage} />

        <Title text={"Verificar Email"} />

        <Subtitle
          text={
            <Group>
              <Subtitle text="Digite o código de 4 dígitos enviado para" />
              <Link
                underline={false}
                color="#496BBA"
                text={route.params.emailRecuperacao}
              />
            </Group>
          }
        />

        <Group row justifyContent="space-between">

          {
          // Busca o indece do codigos de recuperar senha
            [0, 1, 2, 3].map((index) => (
              <Input
                inputValue={inputs[index]}
                key={index}
                ref={(ref) => handleInputRef(ref, index)}
                maxLength={1}
                textAlign={"center"}
                width={60}
                height={60}
                fontSize={32}
                placeholder="0"

                onChangeText={(txt) => {
                  //verificar se o campo é vazio
                  if (txt == "") {

                    focusPrevInput(index)
                    

                  } else {
                    //verificar se o campo foi preenchido
                    const codigoInformado = [...codigo]
                    codigoInformado[index] = txt
                    setCodigo(codigoInformado.join(""))
                    
                    // focusNextInput(index)
                  }
                }}
              />
            ))
          }
        </Group>
        <Button
          onPress={() => validarCodigo()}

          text={carregando ? <ActivityIndicator /> : "Continuar"}
        />
        <Link color="#344F8F" text="Reenviar código" />
      </ContainerSpacing>
    </ContainerScroll>
  );
};
