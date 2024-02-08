import styled from "styled-components/native";

const ButtonStyled = styled.Pressable`
  background-color: #496bba;
  width: 100%;
  padding: 12px 8px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 27px;
`;

const OutlinedButton = styled(ButtonStyled)`
  background-color: #fff;
  border: 1px solid #496bba;
`;

const TextButton = styled.Text`
  font-size: 14px;
  font-family: MontserratAlternates_600SemiBold;
  color: #fff;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  gap: 10px;
`;

export const Button = ({ text = "", outlined = false, icon = null }) => {
  if (outlined) {
    return (
      <OutlinedButton>
        {icon}
        <TextButton style={{ color: "#496bba" }}>{text}</TextButton>
      </OutlinedButton>
    );
  }
  return (
    <ButtonStyled>
      {icon}
      <TextButton>{text}</TextButton>
    </ButtonStyled>
  );
};
