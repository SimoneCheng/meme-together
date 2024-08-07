import { forwardRef } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { useDialogContext } from './dialog';
import { StyledDialogFooterCloseButton } from './dialog.style';

const DialogFooterCloseButton = forwardRef<HTMLButtonElement, ComponentPropsWithRef<'button'>>((props, ref) => {
  const {
    children,
    onClick: onClickProp,
    ...rest
  } = props;
  const { onClose } = useDialogContext();

  const handleClick = (e) => {
    onClickProp?.(e);
    onClose?.();
  };

  return (
    <StyledDialogFooterCloseButton
      ref={ref}
      onClick={handleClick}
      data-dialog-close-button=""
      {...rest}
    >
      {children}
    </StyledDialogFooterCloseButton>
  );
});

DialogFooterCloseButton.displayName = 'DialogFooterCloseButton';

export default DialogFooterCloseButton;
