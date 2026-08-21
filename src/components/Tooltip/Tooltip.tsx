import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './Tooltip.module.css';

type TooltipChildProps = {
  'aria-describedby'?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
};

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

  const tooltipId = useId();

  const open = (isFocused || (isHovered && hoverReady)) && !dismissed;

  const openTimeoutRef = useRef<number | null>(null);

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

  return (
    <span className={styles.tooltipWrapper}>
      {React.cloneElement(children, {
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
          id={tooltipId}
          role="tooltip"
          className={`${styles.tooltip} ${styles[position]}`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
