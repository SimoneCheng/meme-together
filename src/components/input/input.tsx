import { forwardRef } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { useInputProps } from './use-input-props';
import { StyledInput } from './input.style';

interface InputProps extends ComponentPropsWithRef<'input'> {
  variant?: 'unstyled' | 'outline';
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    variant = 'unstyled',
    ...rest
  } = props;
  const inputProps = useInputProps(rest);

  return (
    <StyledInput
      ref={ref}
      data-variant={variant}
      {...inputProps}
    />
  );
});

Input.displayName = 'Input';

export default Input;
