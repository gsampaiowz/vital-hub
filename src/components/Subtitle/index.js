import styled from "styled-components/native";

const SubtitleStyled = styled.Text`
  color: #5f5c6b;
  font-size: 16px;
  font-family: "Quicksand_500Medium";
  text-align: center;
`;

export const Subtitle = ({ text = "" }) => {
  return <SubtitleStyled>{text}</SubtitleStyled>;
};
