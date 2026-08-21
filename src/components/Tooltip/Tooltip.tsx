import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './Tooltip.module.css';

type TooltipChildProps = {
  'aria-describedby'?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
} & React.RefAttributes<HTMLElement>;

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement<TooltipChildProps>;
  position?: TooltipPosition;
  delay?: number;
};

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 300,
}: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hoverReady, setHoverReady] = useState(false);
  const [actualPosition, setActualPosition] =
    useState<TooltipPosition>(position);

  const tooltipId = useId();

  const open = (isFocused || (isHovered && hoverReady)) && !dismissed;

  const openTimeoutRef = useRef<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    return () => {
      clearOpenTimeout();
    };
  }, []);

  function clearOpenTimeout() {
    if (openTimeoutRef.current !== null) {
      window.clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  }

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;

    if (!trigger || !tooltip) return;

    const updatePosition = () => {
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      const margin = 8;
      const viewportPadding = 8;

      const spaceTop = triggerRect.top;
      const spaceRight = window.innerWidth - triggerRect.right;
      const spaceBottom = window.innerHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;

      let nextPosition = position;

      // Flip vertically when necessary
      if (
        position === 'top' &&
        tooltipRect.height + margin > spaceTop &&
        spaceBottom > spaceTop
      ) {
        nextPosition = 'bottom';
      }

      if (
        position === 'bottom' &&
        tooltipRect.height + margin > spaceBottom &&
        spaceTop > spaceBottom
      ) {
        nextPosition = 'top';
      }

      // Flip horizontally when necessary
      if (
        position === 'left' &&
        tooltipRect.width + margin > spaceLeft &&
        spaceRight > spaceLeft
      ) {
        nextPosition = 'right';
      }

      if (
        position === 'right' &&
        tooltipRect.width + margin > spaceRight &&
        spaceLeft > spaceRight
      ) {
        nextPosition = 'left';
      }

      setActualPosition(nextPosition);

      // Position the tooltip after the browser has applied the new
      // position class.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const updatedTooltip = tooltipRef.current;

          if (!updatedTooltip) return;

          const rect = updatedTooltip.getBoundingClientRect();

          let offsetX = 0;
          let offsetY = 0;

          // Keep tooltip inside the horizontal viewport.
          if (rect.left < viewportPadding) {
            offsetX = viewportPadding - rect.left;
          } else if (rect.right > window.innerWidth - viewportPadding) {
            offsetX = window.innerWidth - viewportPadding - rect.right;
          }

          // Keep tooltip inside the vertical viewport.
          if (rect.top < viewportPadding) {
            offsetY = viewportPadding - rect.top;
          } else if (rect.bottom > window.innerHeight - viewportPadding) {
            offsetY = window.innerHeight - viewportPadding - rect.bottom;
          }

          updatedTooltip.style.setProperty(
            '--tooltip-offset-x',
            `${offsetX}px`,
          );

          updatedTooltip.style.setProperty(
            '--tooltip-offset-y',
            `${offsetY}px`,
          );
        });
      });
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, position, content]);

  return (
    <span className={styles.tooltipWrapper}>
      {React.cloneElement(children, {
        ref: (element) => {
          triggerRef.current = element;
        },

        'aria-describedby': open ? tooltipId : undefined,

        onMouseEnter: (e) => {
          children.props.onMouseEnter?.(e);

          setIsHovered(true);
          setDismissed(false);

          clearOpenTimeout();

          openTimeoutRef.current = window.setTimeout(() => {
            setHoverReady(true);
          }, delay);
        },

        onMouseLeave: (e) => {
          children.props.onMouseLeave?.(e);

          setIsHovered(false);
          setHoverReady(false);

          clearOpenTimeout();
        },

        onFocus: (e) => {
          children.props.onFocus?.(e);
          setIsFocused(true);
          setDismissed(false);
        },

        onBlur: (e) => {
          children.props.onBlur?.(e);
          setIsFocused(false);
        },

        onKeyDown: (e) => {
          children.props.onKeyDown?.(e);

          if (e.key === 'Escape') {
            setDismissed(true);
          }
        },
      })}

      {open && (
        <span
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={`${styles.tooltip} ${styles[actualPosition]}`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
