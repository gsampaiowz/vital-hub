import styled from "styled-components/native";

const ButtonStyled = styled.Pressable`
  border-radius: 5px;
  width: 100%;
  min-width: auto;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 27px;
  flex-shrink: 1;
  border: 2px solid #496bba;
`;

const TextButton = styled.Text`
  text-align: center;
  flex-wrap: nowrap;
  font-family: MontserratAlternates_600SemiBold;
`;

export const Button = ({
  text = "",
  border = true,
  self,
  color = "#496bba",
  outlined = false,
  fontSize = 14,
  width = "100%",
  spacing = 8,
  icon = null,
  clickButton = true,
  onPress = () => {},
}) => {
  return (
    <ButtonStyled
      style={{
        width: width,
        paddingVertical: spacing,
        paddingHorizontal: spacing / 2,
        alignSelf: self,
        borderColor: border ? "#496bba" : "transparent",
        backgroundColor: outlined
          ? "white"
          : !clickButton
          ? "white"
          : "#496bba",
      }}
      onPress={onPress}
      clickButton={clickButton}
    >
      {icon}
      <TextButton
        style={{
          color: outlined ? color : clickButton ? "#fbfbfb" : color,
          fontSize: fontSize,
        }}
      >
        {text}
      </TextButton>
    </ButtonStyled>
  );
};
