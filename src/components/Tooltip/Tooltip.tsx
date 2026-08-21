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
  const [open, setOpen] = useState(false);

  const tooltipId = useId();

  return (
    <span className={styles.tooltipWrapper}>
      {React.cloneElement(children, {
        'aria-describedby': open ? tooltipId : undefined,

        onMouseEnter: (e) => {
          children.props.onMouseEnter?.(e);
          setOpen(true);
        },

        onMouseLeave: (e) => {
          children.props.onMouseLeave?.(e);
          setOpen(false);
        },

        onFocus: (e) => {
          children.props.onFocus?.(e);
          setOpen(true);
        },

        onBlur: (e) => {
          children.props.onBlur?.(e);
          setOpen(false);
        },

        onKeyDown: (e) => {
          children.props.onKeyDown?.(e);

          if (e.key === 'Escape') {
            setOpen(false);
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
