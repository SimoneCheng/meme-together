import ReactLoading from 'react-loading';
import { StyledWholeLoadingWrapper } from './loading.style';

const LoadingWithWholePage = (props) => {
  const {
    type,
    color,
    height,
    width
  } = props;

  return (
    <StyledWholeLoadingWrapper>
      <ReactLoading
        type={type}
        color={color}
        height={height}
        width={width}
      />
    </StyledWholeLoadingWrapper>
  );
};

export default LoadingWithWholePage;
