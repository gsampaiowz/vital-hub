import styled from "styled-components/native";

export const Button = styled.Pressable`
  background-color: #496bba;
  color: #fff;
  padding: 12px 8px;
  border-radius: 5px;
  font-size: 14px;
  width: 90%;
  font-family: MontserratAlternates_600SemiBold;
  align-items: center;
  justify-content: center;
`;

export const GoogleButton = styled(Button)`
  background-color: #fff;
  flex-direction: row;
  color: #496BBA;
  gap: 27px;
  border: 1px solid #496BBA;
`;
