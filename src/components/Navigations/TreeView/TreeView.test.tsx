import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { TreeView } from './TreeView';
import type { TreeViewItem } from './TreeView';

const items: TreeViewItem[] = [
  {
    id: 'documents',
    label: 'Documents',
    children: [
      {
        id: 'work',
        label: 'Work',
        children: [
          { id: 'report', label: 'Annual Report.docx' },
          { id: 'presentation', label: 'Presentation.pptx' },
        ],
      },
      { id: 'personal', label: 'Personal' },
    ],
  },
  {
    id: 'pictures',
    label: 'Pictures',
    children: [
      { id: 'vacation', label: 'Vacation' },
      { id: 'family', label: 'Family' },
    ],
  },
  { id: 'downloads', label: 'Downloads' },
];

function getTreeItem(label: string) {
  return screen.getByRole('treeitem', { name: label });
}

describe('TreeView', () => {
  describe('Rendering', () => {
    it('renders the tree with its accessible name', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      expect(screen.getByRole('tree', { name: 'File hierarchy' })).toBeTruthy();
    });

    it('renders root-level items', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      expect(getTreeItem('Documents')).toBeTruthy();
      expect(getTreeItem('Pictures')).toBeTruthy();
      expect(getTreeItem('Downloads')).toBeTruthy();
    });

    it('does not render children of collapsed items', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      expect(screen.queryByRole('treeitem', { name: 'Work' })).toBeNull();
      expect(screen.queryByRole('treeitem', { name: 'Personal' })).toBeNull();
    });

    it('renders initially expanded items', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          defaultExpandedIds={['documents']}
        />,
      );

      expect(getTreeItem('Work')).toBeTruthy();
      expect(getTreeItem('Personal')).toBeTruthy();
    });

    it('provides the correct hierarchical ARIA attributes', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          defaultExpandedIds={['documents']}
        />,
      );

      const documents = getTreeItem('Documents');
      const work = getTreeItem('Work');

      expect(documents.getAttribute('aria-level')).toBe('1');
      expect(documents.getAttribute('aria-posinset')).toBe('1');
      expect(documents.getAttribute('aria-setsize')).toBe('3');

      expect(work.getAttribute('aria-level')).toBe('2');
      expect(work.getAttribute('aria-posinset')).toBe('1');
      expect(work.getAttribute('aria-setsize')).toBe('2');
    });

    it('sets the initial roving tab index', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      expect(getTreeItem('Documents').getAttribute('tabindex')).toBe('0');
      expect(getTreeItem('Pictures').getAttribute('tabindex')).toBe('-1');
      expect(getTreeItem('Downloads').getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Expansion and collapse', () => {
    it('expands a collapsed item using Arrow Right', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'ArrowRight' });

      expect(documents.getAttribute('aria-expanded')).toBe('true');
      expect(getTreeItem('Work')).toBeTruthy();
    });

    it('moves focus to the first child when Arrow Right is pressed on an expanded item', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          defaultExpandedIds={['documents']}
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'ArrowRight' });

      expect(document.activeElement).toBe(getTreeItem('Work'));
    });

    it('collapses an expanded item using Arrow Left', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          defaultExpandedIds={['documents']}
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'ArrowLeft' });

      expect(documents.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('treeitem', { name: 'Work' })).toBeNull();
    });

    it('moves focus to the parent when Arrow Left is pressed on a child', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          defaultExpandedIds={['documents']}
        />,
      );

      const work = getTreeItem('Work');
      work.focus();

      fireEvent.keyDown(work, { key: 'ArrowLeft' });

      expect(document.activeElement).toBe(getTreeItem('Documents'));
    });

    it('expands sibling branches using the asterisk key', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: '*' });

      expect(documents.getAttribute('aria-expanded')).toBe('true');
      expect(getTreeItem('Pictures').getAttribute('aria-expanded')).toBe(
        'true',
      );
      expect(getTreeItem('Work')).toBeTruthy();
      expect(getTreeItem('Vacation')).toBeTruthy();
    });

    it('does not expand a leaf item', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          defaultExpandedIds={['documents']}
        />,
      );

      const personal = getTreeItem('Personal');
      personal.focus();

      fireEvent.keyDown(personal, { key: 'ArrowRight' });

      expect(personal.hasAttribute('aria-expanded')).toBe(false);
    });
  });

  describe('Keyboard navigation', () => {
    it('moves focus to the next visible item using Arrow Down', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'ArrowDown' });

      expect(document.activeElement).toBe(getTreeItem('Pictures'));
    });

    it('moves focus to the previous visible item using Arrow Up', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      const pictures = getTreeItem('Pictures');
      pictures.focus();

      fireEvent.keyDown(pictures, { key: 'ArrowUp' });

      expect(document.activeElement).toBe(getTreeItem('Documents'));
    });

    it('moves focus to the first visible item using Home', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      const downloads = getTreeItem('Downloads');
      downloads.focus();

      fireEvent.keyDown(downloads, { key: 'Home' });

      expect(document.activeElement).toBe(getTreeItem('Documents'));
    });

    it('moves focus to the last visible item using End', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'End' });

      expect(document.activeElement).toBe(getTreeItem('Downloads'));
    });

    it('includes expanded descendants in keyboard navigation', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          defaultExpandedIds={['documents']}
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'ArrowDown' });

      expect(document.activeElement).toBe(getTreeItem('Work'));
    });

    it('moves focus to the first visible item when focus is on the last item and Arrow Down is pressed', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      const downloads = getTreeItem('Downloads');
      downloads.focus();

      fireEvent.keyDown(downloads, { key: 'ArrowDown' });

      expect(document.activeElement).toBe(downloads);
    });

    it('moves focus to the last visible item when focus is on the first item and Arrow Up is pressed', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'ArrowUp' });

      expect(document.activeElement).toBe(documents);
    });
  });

  describe('Selection', () => {
    it('does not expose selection when selection mode is none', () => {
      render(<TreeView items={items} ariaLabel="File hierarchy" />);

      expect(getTreeItem('Documents').hasAttribute('aria-selected')).toBe(
        false,
      );
    });

    it('selects an item using Enter in single-selection mode', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          selectionMode="single"
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'Enter' });

      expect(documents.getAttribute('aria-selected')).toBe('true');
    });

    it('selects an item using Space in single-selection mode', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          selectionMode="single"
        />,
      );

      const pictures = getTreeItem('Pictures');
      pictures.focus();

      fireEvent.keyDown(pictures, { key: ' ' });

      expect(pictures.getAttribute('aria-selected')).toBe('true');
    });

    it('allows only one selected item in single-selection mode', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          selectionMode="single"
          defaultSelectedIds={['documents']}
        />,
      );

      const pictures = getTreeItem('Pictures');
      pictures.focus();

      fireEvent.keyDown(pictures, { key: 'Enter' });

      expect(getTreeItem('Documents').getAttribute('aria-selected')).toBe(
        'false',
      );
      expect(pictures.getAttribute('aria-selected')).toBe('true');
    });

    it('supports multiple selected items', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          selectionMode="multiple"
          defaultSelectedIds={['documents']}
        />,
      );

      const pictures = getTreeItem('Pictures');
      pictures.focus();

      fireEvent.keyDown(pictures, { key: 'Enter' });

      expect(getTreeItem('Documents').getAttribute('aria-selected')).toBe(
        'true',
      );
      expect(pictures.getAttribute('aria-selected')).toBe('true');
    });

    it('deselects an item in multiple-selection mode', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          selectionMode="multiple"
          defaultSelectedIds={['documents']}
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'Enter' });

      expect(documents.getAttribute('aria-selected')).toBe('false');
    });

    it('selects an item when clicked', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          selectionMode="single"
        />,
      );

      const pictures = getTreeItem('Pictures');

      fireEvent.click(pictures);

      expect(pictures.getAttribute('aria-selected')).toBe('true');
    });
  });

  describe('Disabled items', () => {
    const disabledItems: TreeViewItem[] = [
      {
        id: 'available',
        label: 'Available',
      },
      {
        id: 'restricted',
        label: 'Restricted',
        disabled: true,
        children: [{ id: 'restricted-child', label: 'Restricted Child' }],
      },
    ];

    it('identifies disabled items using aria-disabled', () => {
      render(
        <TreeView
          items={disabledItems}
          ariaLabel="Disabled item examples"
          selectionMode="single"
        />,
      );

      expect(getTreeItem('Restricted').getAttribute('aria-disabled')).toBe(
        'true',
      );
    });

    it('does not select a disabled item', () => {
      render(
        <TreeView
          items={disabledItems}
          ariaLabel="Disabled item examples"
          selectionMode="single"
        />,
      );

      const restricted = getTreeItem('Restricted');
      restricted.focus();

      fireEvent.keyDown(restricted, { key: 'Enter' });

      expect(restricted.getAttribute('aria-selected')).toBe('false');
    });

    it('does not expand a disabled parent item', () => {
      render(
        <TreeView items={disabledItems} ariaLabel="Disabled item examples" />,
      );

      const restricted = getTreeItem('Restricted');
      restricted.focus();

      fireEvent.keyDown(restricted, { key: 'ArrowRight' });

      expect(restricted.getAttribute('aria-expanded')).toBe('false');
      expect(
        screen.queryByRole('treeitem', { name: 'Restricted Child' }),
      ).toBeNull();
    });

    it('allows keyboard focus to move to disabled items', () => {
      render(
        <TreeView items={disabledItems} ariaLabel="Disabled item examples" />,
      );

      const available = getTreeItem('Available');
      available.focus();

      fireEvent.keyDown(available, { key: 'ArrowDown' });

      expect(document.activeElement).toBe(getTreeItem('Restricted'));
    });
  });

  describe('Controlled state', () => {
    it('calls onExpandedChange when a controlled item is expanded', () => {
      const onExpandedChange = vi.fn();

      render(
        <TreeView
          items={items}
          ariaLabel="Controlled tree"
          expandedIds={[]}
          onExpandedChange={onExpandedChange}
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'ArrowRight' });

      expect(onExpandedChange).toHaveBeenCalledWith(['documents']);
    });

    it('calls onSelectionChange when a controlled item is selected', () => {
      const onSelectionChange = vi.fn();

      render(
        <TreeView
          items={items}
          ariaLabel="Controlled tree"
          selectionMode="single"
          selectedIds={[]}
          onSelectionChange={onSelectionChange}
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'Enter' });

      expect(onSelectionChange).toHaveBeenCalledWith(['documents']);
    });

    it('does not change controlled selection without updated props', () => {
      render(
        <TreeView
          items={items}
          ariaLabel="Controlled tree"
          selectionMode="single"
          selectedIds={[]}
          onSelectionChange={vi.fn()}
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'Enter' });

      expect(documents.getAttribute('aria-selected')).toBe('false');
    });
  });

  describe('Callbacks', () => {
    it('calls onExpandedChange when a branch is collapsed', () => {
      const onExpandedChange = vi.fn();

      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          expandedIds={['documents']}
          onExpandedChange={onExpandedChange}
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'ArrowLeft' });

      expect(onExpandedChange).toHaveBeenCalledWith([]);
    });

    it('calls onSelectionChange with an empty array when a selected multiple item is deselected', () => {
      const onSelectionChange = vi.fn();

      render(
        <TreeView
          items={items}
          ariaLabel="File hierarchy"
          selectionMode="multiple"
          selectedIds={['documents']}
          onSelectionChange={onSelectionChange}
        />,
      );

      const documents = getTreeItem('Documents');
      documents.focus();

      fireEvent.keyDown(documents, { key: 'Enter' });

      expect(onSelectionChange).toHaveBeenCalledWith([]);
    });
  });
});
