import { StyledDialogFooter } from './dialog.style';

const DialogFooter = ({ children, ...rest }) => {
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
