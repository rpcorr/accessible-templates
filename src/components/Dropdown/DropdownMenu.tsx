import styles from './Dropdown.module.css';

type DropdownMenuProps = {
  children: React.ReactNode;
};

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className={styles.dropdownMenu}>{children}</div>;
}
