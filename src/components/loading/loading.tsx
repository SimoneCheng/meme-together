import ReactLoading from 'react-loading';
import type { LoadingType } from 'react-loading';
import { StyledLoadingWrapper } from './loading.style';

type LoadingProps = {
  type: LoadingType;
  color: string;
  height: number;
  width: number;
};

const Loading = (props: LoadingProps) => {
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
