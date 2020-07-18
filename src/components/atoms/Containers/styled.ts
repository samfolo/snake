import styled from 'styled-components';

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: ${(p) => p.theme.spacing.medium};
  border-radius: ${(p) => p.theme.variables.borderRadiusLarge};
  box-shadow: ${(p) => p.theme.variables.boxShadow1};
`;
