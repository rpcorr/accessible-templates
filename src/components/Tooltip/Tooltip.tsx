import React, { useId, useState } from 'react';
import styles from './Tooltip.module.css';

type TooltipChildProps = {
  'aria-describedby'?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
};

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement<TooltipChildProps>;
};

export function Tooltip({ content, children }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const tooltipId = useId();

  const open = (isHovered || isFocused) && !dismissed;

  return (
    <span className={styles.tooltipWrapper}>
      {React.cloneElement(children, {
        'aria-describedby': open ? tooltipId : undefined,

        onMouseEnter: (e) => {
          children.props.onMouseEnter?.(e);
          setIsHovered(true);
          setDismissed(false);
        },

        onMouseLeave: (e) => {
          children.props.onMouseLeave?.(e);
          setIsHovered(false);
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
        <span id={tooltipId} role="tooltip" className={styles.tooltip}>
          {content}
        </span>
      )}
    </span>
  );
}
