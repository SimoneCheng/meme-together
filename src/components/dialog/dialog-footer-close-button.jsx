import { forwardRef } from 'react';
import { useDialogContext } from './dialog';
import { StyledDialogFooterCloseButton } from './dialog.style';

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
    <StyledDialogFooterCloseButton
      ref={ref}
      type="button"
      onClick={handleClick}
      data-dialog-close-button=""
      {...rest}
    >
      {children}
    </StyledDialogFooterCloseButton>
  )
});

export default DialogFooterCloseButton;
