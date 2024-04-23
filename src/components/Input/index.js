import styled from "styled-components/native";
import { useEffect, useState } from "react";

const InputStyled = styled.TextInput`
  border-radius: 5px;
  width: 100%;
  border-width: 2px;
  border-style: solid;
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

const Icon = styled.View`
  position: absolute;
  right: 10px;
  top: 50%;
`;

export const Input = ({
  fontSize = 14,
  onPress = () => {},
  placeholder = "",
  label = "",
  border = true,
  color = "#34898f",
  onChange = () => {},
  inputValue = "",
  icon = null,
  onChangeText = () => {},
  maxWidth = "100%",
  height = 53,
  textAlign = "left",
}) => {
  const [colorState, setColorState] = useState("#34898f");
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
        onPressIn={onPress}
        readOnly={!border}
        value={inputValue}
        onFocus={() =>
          border &&
          setColorState(inputValue.length < 1 ? "transparent" : "#34898f")
        }
        onChange={[() => {
          setColorState(inputValue.length < 1 ? "transparent" : "#34898f");
        }, onChange]}
        onChangeText={onChangeText}
        onBlur={() => border && setColorState("#34898f")}
        style={{
          fontFamily: "MontserratAlternates_500Medium",
          borderColor: border ? "#49b3ba" : "transparent",
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
