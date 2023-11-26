import React from 'react';
import { StyledDialogContent } from './dialog.style';

const DialogContent = ({ children, ...rest }) => {
  return (
    <StyledDialogContent
      role="dialog"
      aira-modal="true"
      data-dialog-content=""
      {...rest}
    >
      {children}
    </StyledDialogContent>
  );
};

export default DialogContent;
