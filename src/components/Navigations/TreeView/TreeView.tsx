import { useMemo, useRef, useState } from 'react';
import type { ReactNode, KeyboardEvent } from 'react';

import styles from './TreeView.module.css';

/**
 * Represents an individual item within the tree.
 */
export interface TreeViewItem {
  id: string;
  label: string;
  children?: TreeViewItem[];
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
}

/**
 * Selection mode supported by the Tree View.
 */
export type TreeViewSelectionMode = 'none' | 'single' | 'multiple';

/**
 * Props for the TreeView component.
 */
export interface TreeViewProps {
  items: TreeViewItem[];
  ariaLabel: string;
  selectionMode?: TreeViewSelectionMode;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedChange?: (expandedIds: string[]) => void;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  className?: string;
}

/**
 * Represents an item currently visible in the tree.
 */
interface VisibleTreeItem {
  item: TreeViewItem;
  parentId: string | null;
  level: number;
  position: number;
  setSize: number;
}

/**
 * Renders the Tree View component.
 */
export function TreeView({
  items,
  ariaLabel,
  selectionMode = 'none',
  expandedIds: controlledExpandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  selectedIds: controlledSelectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  className,
}: TreeViewProps) {
  const [internalExpandedIds, setInternalExpandedIds] =
    useState<string[]>(defaultExpandedIds);

  const [internalSelectedIds, setInternalSelectedIds] =
    useState<string[]>(defaultSelectedIds);

  const [focusedId, setFocusedId] = useState(items[0]?.id ?? '');

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const expandedIds = controlledExpandedIds ?? internalExpandedIds;
  const selectedIds = controlledSelectedIds ?? internalSelectedIds;

  /**
   * Builds a flat list of currently visible tree items.
   */
  const visibleItems = useMemo(() => {
    const result: VisibleTreeItem[] = [];

    const visit = (
      treeItems: TreeViewItem[],
      parentId: string | null,
      level: number,
    ) => {
      treeItems.forEach((item, index) => {
        result.push({
          item,
          parentId,
          level,
          position: index + 1,
          setSize: treeItems.length,
        });

        if (item.children?.length && expandedIds.includes(item.id)) {
          visit(item.children, item.id, level + 1);
        }
      });
    };

    visit(items, null, 1);

    return result;
  }, [items, expandedIds]);

  /**
   * Determines the currently focusable tree item.
   * Falls back to the first visible item if the
   * previously focused item is no longer visible.
   */
  const effectiveFocusedId = visibleItems.some(
    ({ item }) => item.id === focusedId,
  )
    ? focusedId
    : (visibleItems[0]?.item.id ?? '');

  /**
   * Moves focus to a visible tree item.
   */
  const moveFocus = (id: string) => {
    const target = visibleItems.find(({ item }) => item.id === id);

    if (!target) {
      return;
    }

    setFocusedId(id);
    itemRefs.current[id]?.focus();
  };

  /**
   * Updates the expanded state of a tree item.
   */
  const handleToggle = (id: string) => {
    const target = visibleItems.find(({ item }) => item.id === id);

    if (!target || target.item.disabled || !target.item.children?.length) {
      return;
    }

    const isExpanded = expandedIds.includes(id);

    // Return focus to the parent if a focused descendant
    // is about to become hidden.
    if (isExpanded) {
      const focusedItemIndex = visibleItems.findIndex(
        ({ item }) => item.id === focusedId,
      );

      const focusedItem = visibleItems[focusedItemIndex];

      if (
        focusedItem &&
        focusedItemIndex >
          visibleItems.findIndex(({ item }) => item.id === id) &&
        focusedItem.level > target.level
      ) {
        moveFocus(id);
      }
    }

    const nextExpandedIds = isExpanded
      ? expandedIds.filter((expandedId) => expandedId !== id)
      : [...expandedIds, id];

    if (controlledExpandedIds === undefined) {
      setInternalExpandedIds(nextExpandedIds);
    }

    onExpandedChange?.(nextExpandedIds);
  };

  /**
   * Updates the selected tree items.
   */
  const handleSelect = (id: string) => {
    const target = visibleItems.find(({ item }) => item.id === id);

    if (selectionMode === 'none' || !target || target.item.disabled) {
      return;
    }

    let nextSelectedIds: string[];

    if (selectionMode === 'single') {
      nextSelectedIds = [id];
    } else {
      nextSelectedIds = selectedIds.includes(id)
        ? selectedIds.filter((selectedId) => selectedId !== id)
        : [...selectedIds, id];
    }

    if (controlledSelectedIds === undefined) {
      setInternalSelectedIds(nextSelectedIds);
    }

    onSelectionChange?.(nextSelectedIds);
  };

  /**
   * Handles keyboard interaction within the tree.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    // Prevent nested tree items from handling the same event.
    event.stopPropagation();

    const currentIndex = visibleItems.findIndex(({ item }) => item.id === id);

    const current = visibleItems[currentIndex];

    if (!current) {
      return;
    }

    const { item, parentId } = current;
    const hasChildren = Boolean(item.children?.length);
    const isExpanded = expandedIds.includes(id);

    const focusItem = (index: number) => {
      const target = visibleItems[index];

      if (target) {
        moveFocus(target.item.id);
      }
    };

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusItem(Math.min(currentIndex + 1, visibleItems.length - 1));
        break;

      case 'ArrowUp':
        event.preventDefault();
        focusItem(Math.max(currentIndex - 1, 0));
        break;

      case 'Home':
        event.preventDefault();
        focusItem(0);
        break;

      case 'End':
        event.preventDefault();
        focusItem(visibleItems.length - 1);
        break;

      case 'ArrowRight':
        event.preventDefault();

        if (hasChildren && !isExpanded && !item.disabled) {
          // Expansion retains focus on the parent.
          handleToggle(id);
        } else if (hasChildren && isExpanded) {
          // A subsequent ArrowRight moves into the first child.
          const firstChildId = item.children?.[0]?.id;

          if (firstChildId) {
            moveFocus(firstChildId);
          }
        }
        break;

      case 'ArrowLeft':
        event.preventDefault();

        if (hasChildren && isExpanded && !item.disabled) {
          handleToggle(id);
        } else if (parentId) {
          moveFocus(parentId);
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        handleSelect(id);
        break;

      case '*': {
        event.preventDefault();

        const siblings = visibleItems.filter(
          (visibleItem) => visibleItem.parentId === parentId,
        );

        const nextExpandedIds = Array.from(
          new Set([
            ...expandedIds,
            ...siblings
              .filter(
                ({ item: sibling }) =>
                  sibling.children?.length && !sibling.disabled,
              )
              .map(({ item: sibling }) => sibling.id),
          ]),
        );

        if (controlledExpandedIds === undefined) {
          setInternalExpandedIds(nextExpandedIds);
        }

        onExpandedChange?.(nextExpandedIds);
        break;
      }

      default:
        break;
    }
  };

  /**
   * Recursively renders tree items.
   *
   * Each treeitem owns its nested group, following
   * the WAI-ARIA Tree View structure.
   */
  const renderItems = (treeItems: TreeViewItem[], level: number): ReactNode => (
    <>
      {treeItems.map((item, index) => {
        const hasChildren = Boolean(item.children?.length);
        const isExpanded = expandedIds.includes(item.id);
        const isSelected = selectedIds.includes(item.id);

        return (
          <div
            key={item.id}
            ref={(element) => {
              itemRefs.current[item.id] = element;
            }}
            className={styles.treeItemNode}
            role="treeitem"
            aria-label={item.label}
            tabIndex={effectiveFocusedId === item.id ? 0 : -1}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={selectionMode !== 'none' ? isSelected : undefined}
            aria-disabled={item.disabled || undefined}
            aria-level={level}
            aria-posinset={index + 1}
            aria-setsize={treeItems.length}
            onFocus={() => setFocusedId(item.id)}
            onClick={(event) => {
              event.stopPropagation();
              moveFocus(item.id);
              handleSelect(item.id);
            }}
            onKeyDown={(event) => handleKeyDown(event, item.id)}
          >
            <div className={styles.treeItemContent}>
              {hasChildren && (
                <span
                  className={styles.expandIndicator}
                  aria-hidden="true"
                  onClick={(event) => {
                    event.stopPropagation();
                    moveFocus(item.id);
                    handleToggle(item.id);
                  }}
                >
                  {isExpanded ? '▼' : '▶'}
                </span>
              )}

              {item.icon && (
                <span className={styles.treeItemIcon} aria-hidden="true">
                  {item.icon}
                </span>
              )}

              <span className={styles.treeItemLabel}>{item.label}</span>

              {item.description && (
                <span className={styles.treeItemDescription}>
                  {item.description}
                </span>
              )}
            </div>

            {hasChildren && isExpanded && (
              <div className={styles.treeGroup} role="group">
                {renderItems(item.children!, level + 1)}
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  const containerClassName = [styles.treeView, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClassName}
      role="tree"
      aria-label={ariaLabel}
      aria-multiselectable={selectionMode === 'multiple' ? true : undefined}
    >
      {renderItems(items, 1)}
    </div>
  );
}
