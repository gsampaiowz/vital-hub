import styled from "styled-components/native";

export const Subtitle = ({
  text = "",
  textAlign = "center",
  color = "#5f5c6b",
  fontSize = 16,
  breakLine = true,
  bold,
}) => {
  const SubtitleStyled = styled.Text`
    color: ${color};
    font-size: ${fontSize}px;
    font-family: ${bold ? "Quicksand_600SemiBold" : "Quicksand_500Medium"};
    text-align: ${textAlign};
    white-space: ${breakLine ? "normal" : "nowrap"};
  `;
  return <SubtitleStyled>{text}</SubtitleStyled>;
};
