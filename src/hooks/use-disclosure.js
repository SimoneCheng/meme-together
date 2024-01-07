import { useState, useCallback } from 'react';

const useDisclosure = (props) => {
  const [isOpen, setIsOpen] = useState(props?.defaultIsOpen || false);
  const onOpenProp = props?.onOpen;
  const onCloseProp = props?.onClose;

  const onOpen = useCallback(() => {
    setIsOpen(true);
    onOpenProp?.();
  }, [onOpenProp]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    onCloseProp?.();
  }, [onCloseProp]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

export default useDisclosure;
