import React, { forwardRef } from 'react';
import { useDialogContext } from './dialog';
import { StyledDialogCloseButton } from './dialog.style';

const DialogFooterCloseButton = forwardRef((props, ref) => {
  const {
    children,
    onClick: onClickProp,
    ...rest
  } = props;
  const { onClose } = useDialogContext();

  const handleClick = (e) => {
    onClickProp?.(e);
    onClose?.();
  }

  return (
    <StyledDialogCloseButton
      ref={ref}
      type="button"
      onClick={handleClick}
      data-dialog-close-button=""
      {...rest}
    >
      {children}
    </StyledDialogCloseButton>
  )
});

export default DialogFooterCloseButton;
