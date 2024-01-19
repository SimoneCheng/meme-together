import { forwardRef } from 'react';
import { StyledButton } from './button.style';

const Button = forwardRef((props, ref) => {
  const {
    width,
    height,
    colorScheme = 'gray',
    variant = 'solid',
    children,
    ...rest
  } = props;

  return (
    <StyledButton
      ref={ref}
      type="button"
      colorScheme={colorScheme}
      width={width}
      height={height}
      data-variant={variant}
      {...rest}
    >
      {children}
    </StyledButton>
  )
});

export default Button;
