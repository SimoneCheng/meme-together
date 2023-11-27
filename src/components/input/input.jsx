import React, { forwardRef } from 'react';
import { useInputProps } from './use-input-props';
import { StyledInput } from './input.style';

const Input = forwardRef((props, ref) => {
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

export default Input;
