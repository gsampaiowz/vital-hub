import styled from "styled-components/native";

const ButtonStyled = styled.Pressable`
  border-radius: 5px;
  width: 100%;
  min-width: auto;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 27px;
  min-height: 35px;
  flex-shrink: 1;
  border: 2px solid #496bba;
`;

const TextButton = styled.Text`
  text-align: center;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;

  font-family: MontserratAlternates_600SemiBold;
`;

export const Button = ({
  text = "",
  disabled,
  border = true,
  color = "#496bba",
  borderColor = "#496bba",
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
      disabled={disabled}
      style={{
        width: width,
        paddingVertical: spacing - 1,
        paddingHorizontal: spacing / 2,
        borderColor: border ? borderColor : "transparent",
        backgroundColor: outlined ? "white" : !clickButton ? "white" : color,
      }}
      onPress={onPress}
      clickButton={clickButton}
    >
      {icon != null ? icon : null}
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
