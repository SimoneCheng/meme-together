import { StyledDialogBody } from './dialog.style';

const DialogBody = ({ children, ...rest }) => {
  return (
    <StyledDialogBody
      data-dialog-body=""
      {...rest}
    >
      {children}
    </StyledDialogBody>
  );
}

export default DialogBody;
