import styled from "styled-components/native";

const NavigationButtonStyled = styled.Pressable`
  background-color: rgba(73, 179, 186, 0.15);
  color: #34898f;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const NavigationButton = ({ content, onPress }) => {
  return <NavigationButtonStyled onPress={onPress}>{content}</NavigationButtonStyled>;
};
