import styled from "styled-components/native";
import { Quicksand_500Medium } from "@expo-google-fonts/quicksand";

const InputStyled = styled.TextInput`
  border: 2px solid #49b3ba;
  border-radius: 5px;
  width: 100%;
  padding: 0 16px;
  font-family: MontserratAlternates_600SemiBold;
`;

const InputLabel = styled.Text`
  font-size: 16px;
  color: #33303e;
  font-family: Quicksand_600SemiBold;
`;

const InputGroup = styled.View`
  width: 100%;
  gap: 10px;
`;

export const Input = ({
  fontSize = 14,
  placeholder = "",
  label = "",
  color = "#34898f",
  maxWidth = "100%",
  height = 53,
  textAlign = "left",
}) => {
  return (
    <InputGroup style={{ flexShrink: 1, maxWidth: maxWidth, height: "min-content" }}>
      {label !== "" && <InputLabel>{label}</InputLabel>}
      <InputStyled onFocus={() => color = "transparent"}
        style={{
          color: color,
          textAlign: textAlign,
          height: height,
          fontSize: fontSize,
        }}
        placeholder={placeholder}
      />
    </InputGroup>
  );
};
