import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  containerRef?: HTMLElement | null;
}

const Portal = ({
  children,
  containerRef: containerRefProp
}: PortalProps) => {
  const containerRef = containerRefProp ?? document.body;

  if (containerRef) {
    return createPortal((
      <div data-portal="">
        {children}
      </div>
    ), containerRef);
  }

  return null;
};

export default Portal;
