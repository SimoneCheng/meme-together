import { forwardRef } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { StyledButton } from './button.style';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  width?: number;
  height?: number;
  colorScheme?: 'gray' | 'yellow' | 'navyBlue';
  variant?: 'solid' | 'outline' | 'unstyled';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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
  );
});

Button.displayName = 'Button';

export default Button;
