import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Container0 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 100px);
`;

const loading = (type, color, height, width) => (
  <Container0>
    <ReactLoading type={type} color={color} height={height} width={width} />
  </Container0>
);

const wholePageLoading = (type, color, height, width) => (
  <Container1>
    <ReactLoading type={type} color={color} height={height} width={width} />
  </Container1>
)

export { loading, wholePageLoading };