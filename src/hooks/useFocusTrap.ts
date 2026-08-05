import { useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

type UseFocusTrapOptions = {
  active: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  initialFocus?: boolean;
};

export function useFocusTrap({
  active,
  containerRef,
  initialFocus = true,
}: UseFocusTrapOptions) {
  useEffect(() => {
    if (!active) return;

    const initialFocusableElements = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ??
        [],
    );

    const firstElement = initialFocusableElements[0];

    if (initialFocus) {
      firstElement?.focus();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (!containerRef.current?.contains(document.activeElement)) {
        return;
      }

      const focusableElements = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, containerRef, initialFocus]);
}
