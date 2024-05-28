import { createPortal } from 'react-dom';

const Portal = ({
  children,
  containerRef: containerRefProp
}) => {
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
