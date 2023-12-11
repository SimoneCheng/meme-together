import { StyledDialogHeader } from './dialog.style';

const DialogHeader = ({ children, ...rest }) => {
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
