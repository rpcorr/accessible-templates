import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Main content displayed inside the card. */
  children: ReactNode;

  /** Optional content displayed above the main content. */
  header?: ReactNode;

  /** Optional content displayed below the main content. */
  footer?: ReactNode;

  /** Visual style of the card. */
  variant?: CardVariant;
}
