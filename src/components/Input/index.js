import styled from "styled-components/native";
import { useEffect, useState } from "react";

const InputStyled = styled.TextInput`
  border-radius: 5px;
  width: 100%;
  padding: 0 16px;
  transition: 0.5s;
  font-family: MontserratAlternates_600SemiBold;
  white-space: wrap;
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

const Icon = styled.View`
  position: absolute;
  right: 10px;
  top: 50%;
`;

export const Input = ({
  fontSize = 14,
  placeholder = "",
  label = "",
  border = true,
  color,
  inputValue = "",
  icon = null,
  onChange = () => {},
  maxWidth = "100%",
  height = 53,
  textAlign = "left",
}) => {
  const [colorState, setColorState] = useState("");
  color = colorState;

  useEffect(() => {
    setColorState(border ? "#34898f" : "#4E4B59");
  }, [border]);

  return (
    <InputGroup
      style={{ flexShrink: 1, maxWidth: maxWidth, height: "min-content" }}
    >
      {label !== "" && <InputLabel>{label}</InputLabel>}
      <InputStyled
        readOnly={!border}
        value={inputValue}
        onFocus={() =>
          border &&
          setColorState(inputValue.length < 1 ? "transparent" : "#34898f")
        }
        onChange={() => {
          setColorState(inputValue.length < 1 ? "transparent" : "#34898f");
        }}
        onChangeText={onChange}
        onBlur={() => border && setColorState("#34898f")}
        style={{
          fontFamily: "MontserratAlternates_500Medium",
          border: border ? "2px solid #49b3ba" : "2px solid transparent",
          backgroundColor: border ? "transparent" : "#f5f5f5",
          color: color,
          textAlign: textAlign,
          height: height,
          fontSize: fontSize,
        }}
        placeholder={placeholder}
      />
      <Icon>{icon}</Icon>
    </InputGroup>
  );
};
