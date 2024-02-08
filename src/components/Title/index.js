import styled from "styled-components/native";

const TitleStyled = styled.Text`
  font-size: 20px;
  color: #33303e;
  font-family: MontserratAlternates_600SemiBold;
  text-align: center;
`;

export const Title = ({ text = "" }) => {
  return <TitleStyled>{text}</TitleStyled>;
};
