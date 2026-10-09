import type { ComponentType, ReactNode } from 'react';
import { useState } from 'react';

import { PageLayout } from '../../components';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import {
  ContextMenu,
  ContextMenuItem,
  type ContextMenuTriggerProps,
} from '../../components/OverlaysMenus/ContextMenu';

import styles from './ContextMenuPage.module.css';

type ContextMenuTriggerComponentProps = ContextMenuTriggerProps & {
  children: ReactNode;
};

const ContextArea: ComponentType<ContextMenuTriggerComponentProps> = ({
  children,
  ...triggerProps
}) => (
  <div {...triggerProps} className={styles.contextArea} tabIndex={0}>
    {children}
  </div>
);

export function ContextMenuPage() {
  const [message, setMessage] = useState('');

  const handleAction = (action: string) => {
    setMessage(`${action} selected.`);
  };

  return (
    <PageLayout
      title="Context Menu"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Context Menu</BreadcrumbItem>
        </>
      }
    >
      <section
        className={styles.section}
        aria-labelledby="context-menu-heading"
      >
        <h2 id="context-menu-heading">Basic Context Menu</h2>

        <p>
          Right-click the area below to open the Context Menu. You can also use
          the Context Menu key or Shift+F10 when the area has focus. Use the
          arrow keys to navigate between actions. Copy is disabled in this
          example.
        </p>

        <ContextMenu
          trigger={ContextArea}
          triggerContent={
            <p>
              Right-click or press <kbd>Shift</kbd>+<kbd>F10</kbd> to open the
              menu.
            </p>
          }
        >
          <ContextMenuItem onClick={() => handleAction('Edit')}>
            Edit
          </ContextMenuItem>

          <ContextMenuItem disabled>Copy</ContextMenuItem>

          <ContextMenuItem onClick={() => handleAction('Delete')}>
            Delete
          </ContextMenuItem>
        </ContextMenu>

        <p className={styles.status} role="status" aria-live="polite">
          {message}
        </p>
      </section>
    </PageLayout>
  );
}
