import React, { useId, useState } from 'react';
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
              id={tabId}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={panelId}
              disabled={tab.disabled}
              className={styles.tab}
              onClick={() => setActiveTab(index)}
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
