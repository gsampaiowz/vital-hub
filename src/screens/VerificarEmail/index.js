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
import React, { useEffect, useRef, useState } from "react";
import api from "../../service/service";
import { ActivityIndicator } from "react-native";
import CodeInput from "../../components/CodeInput";

export const VerificarEmail = ({ navigation, route }) => {
 
  const [carregando, setCarregando] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(value);
  }, [value])

  // REQUISIÇÃO PARA VALIDAÇÃO DO CÓDIGO DE RECUPERAÇÃO DE E-MAIL
  async function validarCodigo() {

    setCarregando(true)
    await api.post(`/RecuperarSenha/RotaDeRecuperacaoDeSenha?email=${route.params.emailRecuperacao}&recoveryCode=${value}`)

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

            {/* COMPONENTE DE VERIFICAÇÃO DE CODIGO DO E-MAIL */}
            <CodeInput setValue={setValue} value={value} />

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
