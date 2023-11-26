import styled from 'styled-components';

export const StyledDialogOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;

export const StyledDialogContent = styled.section`
  width: 100%;
  max-width: 500px;
  margin: auto;
  border-radius: 4px;
  background: #fff;
`;

export const StyledDialogHeader = styled.header`
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const StyledDialogBody = styled.div`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
`;

export const StyledDialogFooter = styled.footer`
  padding: 1rem 1.5rem;
`;

export const StyledDialogCloseButton = styled.button`
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 16px;
`;