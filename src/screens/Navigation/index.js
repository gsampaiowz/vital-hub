import { View, Button } from "react-native";

export const Navigation = ({ navigation }) => {
  return (
    <View>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Recuperar Senha"
        onPress={() => navigation.navigate("RecuperarSenha")}
      />
      <Button
        title="Verificar Email"
        onPress={() => navigation.navigate("VerificarEmail")}
      />
      <Button
        title="Redefinir Senha"
        onPress={() => navigation.navigate("RedefinirSenha")}
      />
      <Button
        title="Criar Conta"
        onPress={() => navigation.navigate("CriarConta")}
      />
      <Button
        title="Paciente Perfil"
        onPress={() => navigation.navigate("PacientePerfil")}
      />
      <Button
        title="Consultas Doutor"
        onPress={() => navigation.navigate("ConsultasDoutor")}
      />
      <Button
        title="Consultas Paciente"
        onPress={() => navigation.navigate("ConsultasPaciente")}
      />
      <Button
        title="Selecionar Clinica"
        onPress={() => navigation.navigate("SelecionarClinica")}
      />
      <Button
        title="Selecionar Médico"
        onPress={() => navigation.navigate("SelecionarMedico")}
      />
    </View>
  );
};
