import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get("window").width;

export const ClienteImage = styled.Image`
  position: absolute;
  margin-bottom: ${screenWidth}px;
  width: ${screenWidth}px;
  height: ${screenWidth}px;
  aspect-ratio: 1;
`;
