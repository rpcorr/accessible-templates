import type { HTMLAttributes } from 'react';

export interface ColourPickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  /** Accessible label for the colour picker */
  label: string;

  /** Controlled colour value in hexadecimal format */
  value?: string;

  /** Initial colour value for uncontrolled usage */
  defaultValue?: string;

  /** Callback fired when the selected colour changes */
  onChange?: (value: string) => void;

  /** Optional helper or instructional text */
  instructions?: string;

  /** Optional validation error message */
  error?: string;

  /** Whether the colour selection is required */
  required?: boolean;

  /** Whether the colour picker is disabled */
  disabled?: boolean;

  /** Whether to display a manual HEX text input */
  showHexInput?: boolean;

  /** Name attribute for the native colour input */
  name?: string;
}
