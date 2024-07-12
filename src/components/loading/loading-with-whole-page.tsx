import ReactLoading from 'react-loading';
import type { LoadingType } from 'react-loading';
import { StyledWholeLoadingWrapper } from './loading.style';

type LoadingWithWholePageProps = {
  type: LoadingType;
  color: string;
  height: number;
  width: number;
};

const LoadingWithWholePage = (props: LoadingWithWholePageProps) => {
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
