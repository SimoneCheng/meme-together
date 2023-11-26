import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { Portal } from '@/components/portal';

const DialogContext = createContext(null);
DialogContext.displayName = 'DialogContext';

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('use-dialog-context error');
  }
  return context;
}

const Dialog = ({
  isOpen,
  onClose: onCloseProp,
  children
}) => {

  const onClose = useCallback(() => {
    onCloseProp?.();
  }, [onCloseProp]);

  const contextValue = useMemo(() => {
    return {
      onClose
    }
  }, [onClose]);

  return isOpen ? (
    <Portal>
      <DialogContext.Provider value={contextValue}>
        {children}
      </DialogContext.Provider>
    </Portal>
  ) : null;
};

export default Dialog;
