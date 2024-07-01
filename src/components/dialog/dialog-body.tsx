import type { ComponentPropsWithoutRef } from 'react';
import { StyledDialogBody } from './dialog.style';

const DialogBody = (props: ComponentPropsWithoutRef<'div'>) => {
  const { children, ...rest } = props;

  return (
    <StyledDialogBody
      data-dialog-body=""
      {...rest}
    >
      {children}
    </StyledDialogBody>
  );
};

export default DialogBody;
