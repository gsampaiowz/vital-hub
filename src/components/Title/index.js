import styled from "styled-components/native";

export const Title = ({ text = "", textAlign = "center", color = "#33303e" }) => {
  const TitleStyled = styled.Text`
    font-size: 20px;
    color: ${color};
    font-family: MontserratAlternates_600SemiBold;
    text-align: ${textAlign};
  `;
  return <TitleStyled>{text}</TitleStyled>;
};
