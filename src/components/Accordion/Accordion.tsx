import React, { useId, useState } from 'react';
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

  function toggleItem(id: string) {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  }

  return (
    <div className={styles.accordion}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        const buttonId = `${accordionId}-button-${item.id}`;
        const panelId = `${accordionId}-panel-${item.id}`;

        return (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                className={styles.trigger}
                onClick={() => toggleItem(item.id)}
              >
                {item.title}
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
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
