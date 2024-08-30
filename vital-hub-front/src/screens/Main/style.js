import styled from "styled-components/native";

export const ContentIcon = styled.View.attrs({
  focus: true,
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border-radius: 8px;
  padding: 9px 12px;
  background-color: ${(props) => `${props.tabBarActiveBackgroundColor}`};
`;

export const TextIcon = styled.Text`
  font-size: 14px;
  font-family: "Quicksand_500Medium";
`;
