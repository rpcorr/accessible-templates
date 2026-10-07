import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type {
  ComponentType,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react';

import styles from './Popover.module.css';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverTriggerProps {
  'aria-expanded': boolean;
  'aria-controls': string;
  'aria-haspopup': 'dialog';
  disabled: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export interface PopoverProps {
  trigger: ComponentType<
    PopoverTriggerProps & {
      children: ReactNode;
    }
  >;
  triggerContent: ReactNode;
  children: ReactNode;
  title?: string;
  placement?: PopoverPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  className?: string;
}

export default function Popover({
  trigger: Trigger,
  triggerContent,
  children,
  title,
  placement = 'bottom',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  className = '',
}: PopoverProps) {
  const popoverId = useId();
  const titleId = `${popoverId}-title`;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;

  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const openPopover = useCallback(() => {
    if (disabled) {
      return;
    }

    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      restoreFocusRef.current = activeElement;
    }

    setOpen(true);
  }, [disabled, setOpen]);

  const closePopover = useCallback(
    (restoreFocus = false) => {
      if (restoreFocus) {
        const activeElement = document.activeElement;

        if (activeElement instanceof HTMLElement) {
          restoreFocusRef.current = activeElement;
        }
      }

      setOpen(false);
    },
    [setOpen],
  );

  /*
   * Restore focus after the popover has been removed
   * from the DOM.
   */
  useEffect(() => {
    if (isOpen || !restoreFocusRef.current) {
      return;
    }

    const elementToFocus = restoreFocusRef.current;

    restoreFocusRef.current = null;

    requestAnimationFrame(() => {
      if (document.contains(elementToFocus)) {
        elementToFocus.focus();
      }
    });
  }, [isOpen]);

  /*
   * Close when the user clicks or taps outside
   * the Popover.
   */
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) {
      return;
    }

    const handlePointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (wrapperRef.current?.contains(target)) {
        return;
      }

      closePopover();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, closeOnOutsideClick, closePopover]);

  /*
   * Escape closes the Popover and restores
   * focus to the element that opened it.
   */
  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      event.preventDefault();
      closePopover(true);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEscape, closePopover]);

  /*
   * Close when focus moves completely outside
   * the Popover and its trigger.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleFocusIn = (event: globalThis.FocusEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (wrapperRef.current?.contains(target)) {
        return;
      }

      closePopover();
    };

    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [isOpen, closePopover]);

  /*
   * Position the Popover within the viewport and flip its placement
   * when there is not enough available space.
   */
  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const popover = popoverRef.current;
    const wrapper = wrapperRef.current;

    if (!popover || !wrapper) {
      return;
    }

    const updatePosition = () => {
      const trigger = wrapper.querySelector<HTMLElement>(
        '[aria-haspopup="dialog"]',
      );

      if (!trigger) {
        return;
      }

      const triggerRect = trigger.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const viewportMargin = 8;
      const gap = 8;

      let top = 0;
      let left = 0;
      let actualPlacement = placement;

      const hasSpaceAbove =
        triggerRect.top >= popoverRect.height + gap + viewportMargin;

      const hasSpaceBelow =
        viewportHeight - triggerRect.bottom >=
        popoverRect.height + gap + viewportMargin;

      const hasSpaceLeft =
        triggerRect.left >= popoverRect.width + gap + viewportMargin;

      const hasSpaceRight =
        viewportWidth - triggerRect.right >=
        popoverRect.width + gap + viewportMargin;

      if (placement === 'top') {
        actualPlacement = hasSpaceAbove
          ? 'top'
          : hasSpaceBelow
            ? 'bottom'
            : 'top';

        top =
          actualPlacement === 'top'
            ? triggerRect.top - popoverRect.height - gap
            : triggerRect.bottom + gap;

        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      }

      if (placement === 'bottom') {
        actualPlacement = hasSpaceBelow
          ? 'bottom'
          : hasSpaceAbove
            ? 'top'
            : 'bottom';

        top =
          actualPlacement === 'bottom'
            ? triggerRect.bottom + gap
            : triggerRect.top - popoverRect.height - gap;

        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      }

      if (placement === 'left') {
        actualPlacement = hasSpaceLeft
          ? 'left'
          : hasSpaceRight
            ? 'right'
            : 'left';

        left =
          actualPlacement === 'left'
            ? triggerRect.left - popoverRect.width - gap
            : triggerRect.right + gap;

        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      }

      if (placement === 'right') {
        actualPlacement = hasSpaceRight
          ? 'right'
          : hasSpaceLeft
            ? 'left'
            : 'right';

        left =
          actualPlacement === 'right'
            ? triggerRect.right + gap
            : triggerRect.left - popoverRect.width - gap;

        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      }

      /*
       * Keep the Popover inside the viewport when there is not enough
       * room for its preferred alignment.
       */
      const maxLeft = viewportWidth - popoverRect.width - viewportMargin;
      const maxTop = viewportHeight - popoverRect.height - viewportMargin;

      left = Math.min(
        Math.max(left, viewportMargin),
        Math.max(viewportMargin, maxLeft),
      );

      top = Math.min(
        Math.max(top, viewportMargin),
        Math.max(viewportMargin, maxTop),
      );

      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
      popover.dataset.placement = actualPlacement;
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(popover);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      resizeObserver.disconnect();
    };
  }, [isOpen, placement]);

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (disabled || !isOpen) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closePopover(true);
    }
  };

  const triggerProps: PopoverTriggerProps = {
    'aria-expanded': isOpen,
    'aria-controls': popoverId,
    'aria-haspopup': 'dialog',
    disabled,
    onClick: handleTriggerClick,
    onKeyDown: handleTriggerKeyDown,
  };

  const popoverClassName = [styles.popover, styles[placement], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.trigger}>
        <Trigger {...triggerProps}>{triggerContent}</Trigger>
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          id={popoverId}
          className={popoverClassName}
          role="dialog"
          aria-labelledby={title ? titleId : undefined}
        >
          {title && (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          )}

          <div className={styles.content}>{children}</div>
        </div>
      )}
    </div>
  );
}
