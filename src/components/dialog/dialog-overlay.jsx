import React from 'react';
import { StyledDialogOverlay } from './dialog.style';

const DialogOverlay = ({ ...props }) => {
  return (
    <StyledDialogOverlay
      data-dialog-overlay=""
      {...props}
    />
  );
}

export default DialogOverlay;
