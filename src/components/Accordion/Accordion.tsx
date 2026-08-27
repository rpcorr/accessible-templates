import React, { useId, useRef, useState } from 'react';
import styles from './Accordion.module.css';

type AccordionItem = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const accordionId = useId();

  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const enabledItemIndexes = items
    .map((item, index) => (item.disabled ? null : index))
    .filter((index): index is number => index !== null);

  function toggleItem(id: string) {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  }

  function focusItem(index: number) {
    triggerRefs.current[index]?.focus();
  }

  function getNextItemIndex(currentIndex: number, direction: 1 | -1) {
    const currentEnabledPosition = enabledItemIndexes.indexOf(currentIndex);

    if (currentEnabledPosition === -1 || enabledItemIndexes.length === 0) {
      return null;
    }

    const nextPosition =
      (currentEnabledPosition + direction + enabledItemIndexes.length) %
      enabledItemIndexes.length;

    return enabledItemIndexes[nextPosition];
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();

        const nextIndex = getNextItemIndex(index, 1);

        if (nextIndex !== null) {
          focusItem(nextIndex);
        }

        break;
      }

      case 'ArrowUp': {
        event.preventDefault();

        const nextIndex = getNextItemIndex(index, -1);

        if (nextIndex !== null) {
          focusItem(nextIndex);
        }

        break;
      }

      case 'Home': {
        event.preventDefault();

        const firstIndex = enabledItemIndexes[0];

        if (firstIndex !== undefined) {
          focusItem(firstIndex);
        }

        break;
      }

      case 'End': {
        event.preventDefault();

        const lastIndex = enabledItemIndexes[enabledItemIndexes.length - 1];

        if (lastIndex !== undefined) {
          focusItem(lastIndex);
        }

        break;
      }

      default:
        return;
    }
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);

        const buttonId = `${accordionId}-button-${item.id}`;
        const panelId = `${accordionId}-panel-${item.id}`;

        return (
          <div key={item.id} className={styles.item}>
            <h4 className={styles.heading}>
              <button
                ref={(element) => {
                  triggerRefs.current[index] = element;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                className={styles.trigger}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {item.title}
              </button>
            </h4>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              tabIndex={-1}
              hidden={!isOpen}
              className={styles.panel}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
