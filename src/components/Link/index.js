import styled from "styled-components/native";

const LinkStyled = styled.Text`
  font-size: 14px;
  text-decoration: underline;
  text-align: center;
  font-family: MontserratAlternates_600SemiBold;
`;

export const Link = ({
  color = "#344F8F",
  text = "",
  doubleColor = false,
  text2 = "",
  color2 = "#33303E",
  align = "center",
  underline = true,
  onPress = () => {},
}) => {
  return (
    <LinkStyled
      style={{ alignSelf: align, color: color2, textDecorationLine: "none" }}
    >
      {doubleColor && text2}
      <LinkStyled
      onPress={onPress}
        style={{
          color: color,
          textDecorationColor: underline ? color : "transparent",
        }}
      >
        {text}
      </LinkStyled>
    </LinkStyled>
  );
};
