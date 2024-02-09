import styled from "styled-components/native";

const InputStyled = styled.TextInput`
  border: 2px solid #49b3ba;
  border-radius: 5px;
  padding: 0 16px;
  color: #34898f;
  font-family: MontserratAlternates_600SemiBold;
`;

export const Input = ({
  fontSize = 14,
  placeholder = "",
  width = "100%",
  height = 53,
  textAlign = "left",
}) => {
  return (
    <InputStyled
      style={{ textAlign: textAlign, width: width, height: height, fontSize: fontSize }}
      placeholder={placeholder}
    />
  );
};
