import type { ComponentType, ReactNode } from 'react';
import { useState } from 'react';

import { PageLayout } from '../../components';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSubmenu,
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
        <p>
          An accessible context menu that provides a list of actions related to
          a specific element or area of a page. Supports right-click and
          keyboard activation, nested submenus, and comprehensive keyboard
          navigation.
        </p>

        <h3>Accessibility</h3>
        <ul>
          <li>
            Uses the semantic <code>menu</code> and <code>menuitem</code> roles
            to identify the menu and its actions.
          </li>
          <li>Supports opening the menu with the pointer or keyboard.</li>
          <li>
            Supports nested submenus with <code>aria-haspopup</code>,
            <code>aria-expanded</code>, and <code>aria-controls</code>{' '}
            attributes.
          </li>
          <li>
            Identifies disabled menu items so users can understand which actions
            are unavailable.
          </li>
          <li>
            Supports keyboard navigation through menu items and nested submenus.
          </li>
          <li>
            Supports typeahead navigation to find menu items by typing their
            names.
          </li>
          <li>Positions the menu within the viewport when space is limited.</li>
          <li>
            Closes the menu when the user clicks or moves focus outside it.
          </li>
          <li>Supports closing with the Escape key.</li>
          <li>
            Restores focus to the original trigger when the menu is dismissed.
          </li>
          <li>
            Supports pointer and keyboard interaction for opening and navigating
            nested submenus.
          </li>
        </ul>

        <h3>Keyboard Support</h3>
        <ul>
          <li>Right-click opens the context menu.</li>
          <li>
            <kbd>Shift</kbd> + <kbd>F10</kbd> opens the context menu from the
            keyboard.
          </li>
          <li>
            The Context Menu key opens the context menu from the keyboard, where
            supported.
          </li>
          <li>
            <kbd>Arrow Down</kbd> moves focus to the next menu item.
          </li>
          <li>
            <kbd>Arrow Up</kbd> moves focus to the previous menu item.
          </li>
          <li>
            <kbd>Home</kbd> moves focus to the first menu item.
          </li>
          <li>
            <kbd>End</kbd> moves focus to the last menu item.
          </li>
          <li>Typing characters moves focus to a matching menu item.</li>
          <li>
            <kbd>Arrow Right</kbd> opens a submenu and moves focus to its first
            enabled item.
          </li>
          <li>
            <kbd>Arrow Left</kbd> closes a submenu and returns focus to its
            trigger.
          </li>
          <li>
            <kbd>Escape</kbd> closes the menu or submenu and restores focus
            appropriately.
          </li>
          <li>
            <kbd>Enter</kbd> or <kbd>Space</kbd> activates the focused menu
            item.
          </li>
          <li>Disabled menu items cannot be activated.</li>
        </ul>

        <h3>Basic Context Menu</h3>

        <p>
          Right-click the area below to open the Context Menu. You can also use
          the Context Menu key or <kbd>Shift</kbd>+<kbd>F10</kbd> when the area
          has focus. Use the arrow keys to navigate between actions. Copy is
          disabled in this example. Open Share to explore the nested submenu.
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

          <ContextMenuSubmenu label="Share">
            <ContextMenuItem onClick={() => handleAction('Share by email')}>
              Email
            </ContextMenuItem>

            <ContextMenuItem onClick={() => handleAction('Copy link')}>
              Copy link
            </ContextMenuItem>
          </ContextMenuSubmenu>

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
