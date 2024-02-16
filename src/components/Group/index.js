import styled from "styled-components/native";

const GroupView = styled.View`
  width: 100%;
  flex-shrink: 1;
`;

export const Group = ({
  children,
  row,
  maxWidth = "100%",
  alignItems = "center",
  justifyContent = "center",
  gap = 10,
}) => {
  return (
    <GroupView
      style={{
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
