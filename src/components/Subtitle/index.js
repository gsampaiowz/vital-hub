import styled from "styled-components/native";

export const Subtitle = ({ text = "", textAlign = "center", color = "#5f5c6b" }) => {
  const SubtitleStyled = styled.Text`
    color: ${color};
    font-size: 16px;
    font-family: "Quicksand_500Medium";
    text-align: ${textAlign};
  `;
  return <SubtitleStyled>{text}</SubtitleStyled>;
};
