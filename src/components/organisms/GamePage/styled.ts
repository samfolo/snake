import styled from 'styled-components';

export const GamePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: ${(p) => p.theme.palette.palettePale};
`;
