import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Container0 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const loading = (type, color, height, width) => (
    <Container0>
            <ReactLoading type={type} color={color} height={height} width={width} />
    </Container0>
);

export default loading;