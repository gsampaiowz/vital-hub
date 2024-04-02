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
  const user = JSON.parse(await AsyncStorage.getItem("token")).token;

  if (user === null) {
    return null;
  }

  //Decodifica o token recebido
  const decoded = jwtDecode(user);
  return {
    id: decoded.jti,
    name: decoded.name,
    role: decoded.role,
    email: decoded.email,
    token: user,
  };
};
