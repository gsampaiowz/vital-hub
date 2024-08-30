import styled from "styled-components/native";

const ContainersStyle = `
flex: 1;
flex-basis: auto;
background-color: white;
gap: 20px;
`;

export const ContainerSafe = styled.SafeAreaView`
  ${ContainersStyle}
  padding: 60px 0 20px 0;
  align-items: center;
`;

export const Container = styled.View`
  ${ContainersStyle}
  align-items: center;
`;

export const ContainerScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 20, 
    paddingTop: 40,
    alignItems: "center",
    gap: 20,
  },
})`
  ${ContainersStyle}
`;

export const ContainerSpacing = styled.View`
  ${ContainersStyle}
  flex-shrink: 1;
  align-items: center;
  flex-grow: 0;
  margin: 0 auto;
  width: 90%;
  min-height: auto;
`;
