import styled from "styled-components/native";

const GroupView = styled.View`
  width: 100%;
  flex-shrink: 1;
  min-height: auto;
`;

export const Group = ({
  children,
  row,
  radius,
  bgColor = "transparent",
  flexWrap,
  maxWidth = "100%",
  padding,
  alignItems = "center",
  justifyContent = "center",
  gap = 10,
}) => {
  return (
    <GroupView
      style={{
        padding: padding,
        borderRadius: radius,
        backgroundColor: bgColor,
        flexWrap: flexWrap ? "wrap" : "nowrap",
        maxWidth: maxWidth,
        flexDirection: row ? "row" : "column",
        alignItems: alignItems,
        justifyContent: justifyContent,
        gap: gap,
      }}
    >
      {children}
    </GroupView>
  );
};
