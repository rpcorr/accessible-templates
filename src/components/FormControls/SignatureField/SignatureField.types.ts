import type { HTMLAttributes } from 'react';

export type SignatureValue =
  | {
      type: 'drawn';
      value: string;
    }
  | {
      type: 'typed';
      value: string;
    }
  | null;

export interface SignatureFieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  label: string;
  value?: SignatureValue;
  onChange?: (value: SignatureValue) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  instructions?: string;
}
