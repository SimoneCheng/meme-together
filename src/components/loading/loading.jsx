import ReactLoading from 'react-loading';
import { StyledLoadingWrapper } from './loading.style';

const Loading = (props) => {
  const {
    type,
    color,
    height,
    width
  } = props;

  return (
    <StyledLoadingWrapper>
      <ReactLoading
        type={type}
        color={color}
        height={height}
        width={width}
      />
    </StyledLoadingWrapper>
  );
};

export default Loading;
