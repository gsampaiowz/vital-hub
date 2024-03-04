import styled from "styled-components/native";

export const Subtitle = ({
  text = "",
  textAlign = "center",
  color = "#5f5c6b",
  fontSize = 16,
  bold,
}) => {
  const SubtitleStyled = styled.Text`
    color: ${color};
    font-size: ${fontSize}px;
    font-family: ${bold ? "Quicksand_600SemiBold" : "Quicksand_500Medium"};
    text-align: ${textAlign};
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 5px;
    align-items: center;
  `;
  return <SubtitleStyled>{text}</SubtitleStyled>;
};
