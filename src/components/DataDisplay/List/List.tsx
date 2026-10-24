import type { ReactNode, HTMLAttributes, OlHTMLAttributes } from 'react';
import styles from './List.module.css';

export type ListVariant = 'unordered' | 'ordered';
export type ListStyle = 'default' | 'none' | 'circle' | 'decimal';

interface BaseListProps {
  items: ReactNode[];
  variant?: ListVariant;
  listStyle?: ListStyle;
  className?: string;
}

type UnorderedListProps = BaseListProps &
  Omit<HTMLAttributes<HTMLUListElement>, 'children'>;

type OrderedListProps = BaseListProps &
  Omit<OlHTMLAttributes<HTMLOListElement>, 'children'>;

export type ListProps = UnorderedListProps | OrderedListProps;

export const List = ({
  items,
  variant = 'unordered',
  listStyle = 'default',
  className,
  ...props
}: ListProps) => {
  const classNames = [
    styles.list,
    styles[variant],
    styles[listStyle],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const listItems = items.map((item, index) => (
    <li key={index} className={styles.item}>
      {item}
    </li>
  ));

  if (variant === 'ordered') {
    return (
      <ol
        {...(props as OlHTMLAttributes<HTMLOListElement>)}
        className={classNames}
      >
        {listItems}
      </ol>
    );
  }

  return (
    <ul {...(props as HTMLAttributes<HTMLUListElement>)} className={classNames}>
      {listItems}
    </ul>
  );
};

export default List;
