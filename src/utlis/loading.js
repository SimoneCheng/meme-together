import ReactLoading from 'react-loading';
import styled from 'styled-components';

const StyledLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledWholeLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 100px);
`;

export const loading = (type, color, height, width) => (
  <StyledLoadingWrapper>
    <ReactLoading type={type} color={color} height={height} width={width} />
  </StyledLoadingWrapper>
);

export const wholePageLoading = (type, color, height, width) => (
  <StyledWholeLoadingWrapper>
    <ReactLoading type={type} color={color} height={height} width={width} />
  </StyledWholeLoadingWrapper>
);
