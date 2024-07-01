import type { ComponentPropsWithoutRef } from 'react';
import { StyledDialogFooter } from './dialog.style';

const DialogFooter = ({ children, ...rest }: ComponentPropsWithoutRef<'footer'>) => {
  return (
    <StyledDialogFooter
      data-dialog-footer=""
      {...rest}
    >
      {children}
    </StyledDialogFooter>
  );
};

export default DialogFooter;
