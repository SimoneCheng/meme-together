import { ComponentPropsWithoutRef } from 'react';
import { StyledDialogHeader } from './dialog.style';

const DialogHeader = ({ children, ...rest }: ComponentPropsWithoutRef<'header'>) => {
  return (
    <StyledDialogHeader
      data-dialog-header=""
      {...rest}
    >
      {children}
    </StyledDialogHeader>
  );
};

export default DialogHeader;
