import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";

if (!global.atob) {
  global.atob = decode;
}

if (!global.btoa) {
  global.btoa = encode;
}

export const userDecodeToken = async () => {
  const user = await AsyncStorage.getItem("token");

  if (user === null) {
    return null;
  }

  //Decodifica o token recebido
  const decoded = jwtDecode(token);

  return {
    name: decoded.name,
    role: decoded.role,
    email: decoded.email,
  };
};
