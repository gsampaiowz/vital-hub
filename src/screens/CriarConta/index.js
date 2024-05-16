import { ContainerScroll, ContainerSpacing } from "../../components/Container";
import { NavigationButton } from "../../components/NavigationButton";
import { AntDesign } from "@expo/vector-icons";
import LogoImage from "../../assets/img/Logo.png";
import { Logo } from "../../components/Logo";
import { Subtitle } from "../../components/Subtitle";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { Title } from "./../../components/Title";
import { Group } from "../../components/Group";
import { useRef, useState } from "react";
import ToastManager, { Toast } from "toastify-react-native";
import api from "../../service/service";
import { ActivityIndicator } from "react-native";
import { Masks, useMaskedInputProps } from "react-native-mask-input";

export const CriarConta = ({ navigation }) => {
  // CONST COM OS CAMPOS DE CRIAÇÃO DE CONTA
  const [inputs, setInputs] = useState({
    nome: "",
    email: "",
    senha: "",
    cidade: "",
    logradouro: "",
    cpf: "",
    dataNascimento: "",
    numero: "",
    cep: "",
    rg: "",
  });

  const dataMasked = useMaskedInputProps({
    value: inputs.dataNascimento,
    onChangeText: (data) => setInputs({ ...inputs, dataNascimento: data }),
    mask: Masks.DATE_DDMMYYYY,
  });

  const cpfMasked = useMaskedInputProps({
    value: inputs.cpf,
    onChangeText: (txt) => setInputs({ ...inputs, cpf: txt }),
    mask: Masks.BRL_CPF,
  });

  const [carregando, setCarregando] = useState(false);

  const scrollViewRef = useRef(null);

  // REQUISIÇÃO PARA CADASTRAR UM USUÁRIO NOVO
  async function fillProfile() {
    if (Object.values(inputs).some((input) => input === "")) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      Toast.error("Preencha todos os campos");

      return;
    }

    setCarregando(true);

    // INSTANCIA UM FORMDATA
    const formData = new FormData();

    formData.append("rg", inputs.rg);
    formData.append("cpf", inputs.cpf);
    formData.append("cep", inputs.cep);
    formData.append("logradouro", inputs.logradouro);
    formData.append("numero", inputs.numero);
    formData.append("cidade", inputs.cidade);
    formData.append("nome", inputs.nome);
    formData.append("email", inputs.email);
    formData.append("senha", inputs.senha);
    formData.append("idTipoUsuario", "701230CA-0D31-4161-8F45-1E7341485369");
    formData.append(
      "dataNascimento",
      new Date(
        inputs.dataNascimento.split("/").reverse().join("-") + "T00:00:00.000Z"
      ).toISOString()
    );

    await api
      .post("/Pacientes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setCarregando(false);
    navigation.navigate("Login");
  }

  // LÓGICA PARA O TOAST
  async function CheckExistAuthentication() {
    LocalAuthentication.hashHardwareAsync().then((response) => {
      if (response) {
        Toast.success("Conta Criado com sucesso");
      } else {
        Toast.error("Campo inválido");
      }
    });
  }

  return (
    <ContainerScroll ref={scrollViewRef}>
      <ToastManager height={60} width={300} />
      <ContainerSpacing>
        <NavigationButton
          onPress={() => navigation.navigate("Login")}
          content={<AntDesign name="close" size={24} color="#34898f" />}
        />

        <Logo source={LogoImage} />

        <Title text={"Criar Conta"} />

        <Subtitle text="Insira seu endereço de e-mail e senha para realizar seu cadastro." />

        <Group gap={10}>
          <Input
            inputValue={inputs.nome}
            placeholder="Seu nome completo"
            label="Nome"
            onChangeText={(text) => setInputs({ ...inputs, nome: text })}
          />
          <Input
            inputValue={inputs.email}
            placeholder="E-mail"
            label="E-mail"
            onChangeText={(text) => setInputs({ ...inputs, email: text })}
          />
          <Input
            inputValue={inputs.senha}
            label="Senha"
            placeholder="*******"
            onChangeText={(text) => setInputs({ ...inputs, senha: text })}
          />
          <Input
            inputValue={inputs.cidade}
            label="Cidade"
            placeholder="Cidade"
            onChangeText={(text) => setInputs({ ...inputs, cidade: text })}
          />
          <Input
            inputValue={inputs.logradouro}
            label="Logradouro"
            placeholder="Logradouro"
            onChangeText={(text) => setInputs({ ...inputs, logradouro: text })}
          />
          <Input
            inputValue={inputs.dataNascimento}
            label="Data de Nascimento"
            placeholder="_ / _ / _"
            onChangeText={(text) =>
              setInputs({ ...inputs, dataNascimento: text })
            }
            {...dataMasked}
          />
          <Group row={true}>
            <Input
              inputValue={inputs.cpf}
              label="Cpf"
              placeholder="000.000.000-00"
              onChangeText={(text) => setInputs({ ...inputs, cpf: text })}
              {...cpfMasked}
            />
            <Input
              inputValue={inputs.numero}
              placeholder="Nº"
              label="Número"
              onChangeText={(text) => setInputs({ ...inputs, numero: text })}
            />
          </Group>
          <Group row={true}>
            <Input
              inputValue={inputs.cep}
              label="Cep"
              placeholder="00000-000"
              onChangeText={(text) => setInputs({ ...inputs, cep: text })}
            />
            <Input
              inputValue={inputs.rg}
              label="Rg"
              placeholder="00.000.000-0"
              onChangeText={(text) => setInputs({ ...inputs, rg: text })}
            />
          </Group>
        </Group>
        <Button
          text={carregando ? <ActivityIndicator /> : "Cadastrar"}
          onPress={() => fillProfile()}
        />
        <Link
          doubleColor
          text2="Já possui uma conta? "
          text="Faça login"
          onPress={() => navigation.navigate("Login")}
        />
      </ContainerSpacing>
    </ContainerScroll>
  );
};
