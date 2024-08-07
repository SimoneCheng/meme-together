import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode
} from 'react';
import { Portal } from '@/components/portal';
import DialogOverlay from './dialog-overlay';

type DialogProps = {
  isOpen: boolean;
  closeOnOutsideClick?: boolean;
  children: ReactNode;
  onClose?: () => void;
};

type DialogContextValue = Pick<DialogProps, 'onClose' | 'closeOnOutsideClick'>;

const DialogContext = createContext<DialogContextValue>(null);
DialogContext.displayName = 'DialogContext';

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('use-dialog-context error');
  }
  return context;
};

const Dialog = ({
  isOpen,
  onClose: onCloseProp,
  closeOnOutsideClick = true,
  children
}: DialogProps) => {

  const onClose = useCallback(() => {
    onCloseProp?.();
  }, [onCloseProp]);

  const contextValue = useMemo(() => {
    return {
      onClose,
      closeOnOutsideClick
    };
  }, [closeOnOutsideClick, onClose]);

  return isOpen ? (
    <Portal>
      <DialogContext.Provider value={contextValue}>
        <DialogOverlay>
          {children}
        </DialogOverlay>
      </DialogContext.Provider>
    </Portal>
  ) : null;
};

export default Dialog;
