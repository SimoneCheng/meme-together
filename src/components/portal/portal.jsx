import React from "react";
import { createPortal } from "react-dom";

function Portal({
  children,
  containerRef: containerRefProp
}) {
  const containerRef = containerRefProp ?? document.body;

  if (containerRef) {
    return createPortal((
      <div data-portal="">
        {children}
      </div>
    ), containerRef);
  }

  return null;
}

export default Portal;
