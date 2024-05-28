import styled from 'styled-components';

const colorSchemeMapping = {
  'gray': 'rgb(239, 239, 239)',
  'yellow': '#ffc349',
  'navyBlue': '#005566'
};

export const StyledButton = styled.button`
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;
  width: ${props => props.width ? props.width : 'auto'};
  height: ${props => props.height ? props.height : 'auto'};

  &[data-variant="solid"] {
    border: none;
    background:  ${props => colorSchemeMapping[props.colorScheme]};
    color: ${props => props.colorScheme === 'navyBlue' ? '#fff' : 'initial'};
  }

  &[data-variant="outline"] {
    border: 1px ${props => colorSchemeMapping[props.colorScheme]} solid;
    background: transparent;
    color: ${props => colorSchemeMapping[props.colorScheme]};
  }

  &[data-variant="unstyled"] {
    border: none;
    background: transparent;
  }

  &:disabled {
    opacity: 0.5;
  }
`;
