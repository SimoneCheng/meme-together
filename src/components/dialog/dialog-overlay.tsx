import { ComponentPropsWithoutRef } from 'react';
import { StyledDialogOverlay } from './dialog.style';

const DialogOverlay = ({ ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <StyledDialogOverlay
      data-dialog-overlay=""
      {...props}
    />
  );
};

export default DialogOverlay;
