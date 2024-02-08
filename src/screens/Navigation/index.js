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
    </View>
  );
};
