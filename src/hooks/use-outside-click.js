import { useRef, useEffect } from 'react';

// for a single click the order of event is:
// 1. touchstart
// 2. touchmove
// 3. touchend
// 4. mouseover
// 5. mousemove
// 6. mousedown
// 7. mouseup
// 8. click

export const useOutsideClick = ({
  ref,
  enabled = true,
  handler: outsideClickHandler,
}) => {
  const stateRef = useRef({
    isPointerDown: false,
    // browsers typically dispatch emulated mouse and click events when there is only a single active touch point.
    isEmulatedMouseEvent: false,
  });

  useEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    if (!el) return;

    const state = stateRef.current;
    const checkIsContains = (target) => {
      if (!target) return false;
      return el.contains(target);
    };

    const handleMouseDown = (e) => {
      // only accepts left-click
      if (e.button > 0) return;
      const isContains = checkIsContains(e.target);

      if (isContains) return;
      state.isPointerDown = true;
    };

    const handleMouseUp = (e) => {
      // ignore emluated mouse evnet
      if (state.isEmulatedMouseEvent) {
        state.isEmulatedMouseEvent = false;
        return;
      }

      if (!state.isPointerDown) return;
      state.isPointerDown = false;

      const isContains = checkIsContains(e.target);
      if (isContains) return;
      outsideClickHandler?.(e);
    };

    const handleTouchStart = (e) => {
      const isContains = checkIsContains(e.target);
      if (isContains) return;
      state.isPointerDown = true;
    };

    const handleTouchEnd = (e) => {
      state.isEmulatedMouseEvent = true;
      if (!state.isPointerDown) return;
      state.isPointerDown = false;

      const isContains = checkIsContains(e.target);
      if (isContains) return;
      outsideClickHandler?.(e);
    };

    const doc = el.ownerDocument ?? document;
    doc.addEventListener('mousedown', handleMouseDown, true);
    doc.addEventListener('mouseup', handleMouseUp, true);
    doc.addEventListener('touchstart', handleTouchStart, true);
    doc.addEventListener('touchend', handleTouchEnd, true);

    return () => {
      doc.removeEventListener('mousedown', handleMouseDown, true);
      doc.removeEventListener('mouseup', handleMouseUp, true);
      doc.removeEventListener('touchstart', handleTouchStart, true);
      doc.removeEventListener('touchend', handleTouchEnd, true);
    };
  }, [ref, enabled, outsideClickHandler]);
};
