import { useRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { useDialogContext } from './dialog';
import { StyledDialogContent } from './dialog.style';
import { useOutsideClick } from '@/hooks';

const DialogContent = ({ children, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  const ref = useRef<HTMLDivElement>();
  const {
    closeOnOutsideClick,
    onClose
  } = useDialogContext();

  const handleClose = () => {
    if (!closeOnOutsideClick) return;
    onClose();
  };

  useOutsideClick({
    ref,
    handler: handleClose
  });

  return (
    <StyledDialogContent
      role="dialog"
      aira-modal="true"
      data-dialog-content=""
      ref={ref}
      {...rest}
    >
      {children}
    </StyledDialogContent>
  );
};

export default DialogContent;
