import React, { useId, useRef, useState } from 'react';
import styles from './Tab.module.css';

type TabsOrientation = 'horizontal' | 'vertical';

type Tab = {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  tabs: Tab[];
  orientation?: TabsOrientation;
};

export function Tabs({ tabs, orientation = 'horizontal' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabsId = useId();

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const enabledTabIndexes = tabs
    .map((tab, index) => (tab.disabled ? -1 : index))
    .filter((index) => index !== -1);

  function focusTab(index: number) {
    const tab = tabs[index];

    if (!tab || tab.disabled) {
      return;
    }

    setActiveTab(index);

    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const isHorizontal = orientation === 'horizontal';

    switch (event.key) {
      case 'ArrowRight':
        if (!isHorizontal) {
          return;
        }

        event.preventDefault();
        focusTab(getNextTabIndex(index, 1) ?? index);
        break;

      case 'ArrowLeft':
        if (!isHorizontal) {
          return;
        }

        event.preventDefault();
        focusTab(getNextTabIndex(index, -1) ?? index);
        break;

      case 'ArrowDown':
        if (isHorizontal) {
          return;
        }

        event.preventDefault();
        focusTab(getNextTabIndex(index, 1) ?? index);
        break;

      case 'ArrowUp':
        if (isHorizontal) {
          return;
        }

        event.preventDefault();
        focusTab(getNextTabIndex(index, -1) ?? index);
        break;

      case 'Home':
        event.preventDefault();

        if (enabledTabIndexes.length > 0) {
          focusTab(enabledTabIndexes[0]);
        }

        break;

      case 'End':
        event.preventDefault();

        if (enabledTabIndexes.length > 0) {
          focusTab(enabledTabIndexes[enabledTabIndexes.length - 1]);
        }

        break;

      default:
        break;
    }
  }

  function getNextTabIndex(
    currentIndex: number,
    direction: 1 | -1,
  ): number | null {
    if (enabledTabIndexes.length === 0) {
      return null;
    }

    const currentPosition = enabledTabIndexes.indexOf(currentIndex);

    if (currentPosition === -1) {
      return null;
    }

    const nextPosition =
      (currentPosition + direction + enabledTabIndexes.length) %
      enabledTabIndexes.length;

    return enabledTabIndexes[nextPosition];
  }

  return (
    <div
      className={`${styles.tabs} ${
        orientation === 'vertical' ? styles.vertical : styles.horizontal
      }`}
    >
      <div
        role="tablist"
        aria-orientation={orientation}
        className={styles.tabList}
      >
        {tabs.map((tab, index) => {
          const tabId = `${tabsId}-tab-${tab.id}`;
          const panelId = `${tabsId}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={panelId}
              tabIndex={activeTab === index ? 0 : -1}
              disabled={tab.disabled}
              className={styles.tab}
              onClick={() => {
                if (!tab.disabled) {
                  setActiveTab(index);
                }
              }}
              onKeyDown={(event) => {
                handleKeyDown(event, index);
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        const tabId = `${tabsId}-tab-${tab.id}`;
        const panelId = `${tabsId}-panel-${tab.id}`;

        return (
          <div
            key={tab.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            hidden={activeTab !== index}
            className={styles.tabPanel}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}
