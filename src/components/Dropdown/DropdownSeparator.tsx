import React from 'react';
import styles from './Dropdown.module.css';

export function DropdownSeparator() {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={styles.dropdownSeparator}
    />
  );
}
