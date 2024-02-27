import styled from "styled-components/native";

const ContainersStyle = `
flex: 1;
flex-basis: auto;
background-color: white;
gap: 20px;
`;

export const ContainerSafe = styled.SafeAreaView`
  ${ContainersStyle}
  padding-bottom: 20px;
  align-items: center;
`;

export const Container = styled.View`
  ${ContainersStyle}
  align-items: center;
`;

export const ContainerScroll = styled.ScrollView`
  ${ContainersStyle}
  padding: 0 0 20px 0;
`;

export const ContainerSpacing = styled.View`
  ${ContainersStyle}
  flex-shrink: 1;
  flex-grow: 0;
  width: 90%;
  min-height: auto;
`;
