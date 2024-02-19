import styled from "styled-components/native";

const ButtonStyled = styled.Pressable`
  width: 100%;
  padding: 12px 8px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 27px;
  flex-shrink: 1;
  border: 2px solid #496bba;

`;

const TextButton = styled.Text`
  font-family: MontserratAlternates_600SemiBold;
`;

export const Button = ({
  text = "",
  outlined = false,
  fontSize = 14,
  icon = null,
  clickButton = true,
  onPress = () => {},
}) => {
  return (
    <ButtonStyled
      style={{ backgroundColor: outlined ? "white" : !clickButton ? "white" : "#496bba"}}
      onPress={onPress}
      clickButton={clickButton}
    >
      {icon}
      <TextButton
        style={{
          color: outlined ? "#496bba" : clickButton ? "#fbfbfb" : "#496bba",
          fontSize: fontSize,
        }}
      >
        {text}
      </TextButton>
    </ButtonStyled>
  );
};
