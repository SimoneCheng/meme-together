import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #D0D0D0;
  overflow: hidden;
  width: 200px;
  @media screen and (max-width: 768px) {
    width: calc(100% - 100px);
  }
`;

export const StyledH3 = styled.h3`
  padding: 10px;
  margin: 0;
`;

export const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const StyledButton = styled.button<{ active: boolean }>`
  background: transparent;
  width: 100%;
  border: none;
  text-align: left;
  border-top: 1px solid #D0D0D0;
  padding: 10px;
  border-left: ${props => props.active ? '4px solid #ffc349' : '4px solid transparent'};
  cursor: pointer;
  font-size: 18px;
  &:hover{
    background-color: #F0F0F0;
  }
`;
