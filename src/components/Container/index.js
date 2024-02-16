import styled from "styled-components/native";

const ContainersStyle = `
flex: 1;
background-color: white;
padding: 0 5%;
gap: 20px;
`;

export const ContainerSafe = styled.SafeAreaView`
  ${ContainersStyle}
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
  flex: none;
  width: 100%;
`;
