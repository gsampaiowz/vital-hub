import { View } from "react-native";
import styled from "styled-components/native";

export const Group = ({
  children,
  row,
  alignItems = "center",
  justifyContent = "center",
  gap = 10,
}) => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: row ? "row" : "column",
        alignItems: alignItems,
        justifyContent: justifyContent,
        gap: gap,
      }}
    >
      {children}
    </View>
  );
};
