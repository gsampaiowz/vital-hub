import styled from "styled-components/native";

const InputStyled = styled.TextInput`
  width: 100%;
  height: 53px;
  border: 2px solid #49b3ba;
  border-radius: 5px;
  padding: 16px;
  color: #34898f;
  font-family: MontserratAlternates_600SemiBold;
  font-size: 14px;
`;

export const InputsContainer = styled.View`
  gap: 10px;
  width: 100%;
  align-items: center;
`;

export const InputsRow = styled(InputsContainer)`
  flex-direction: row;
  justify-content: space-between;
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
