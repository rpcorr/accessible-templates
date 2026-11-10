import { useState } from 'react';
import { TreeView } from '..';
import {
  basicItems,
  disabledItems,
  organizationItems,
} from '../../../../data/treeViewExampleData';

export function TreeViewExamples() {
  const [expandedIds, setExpandedIds] = useState<string[]>(['documents']);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [multipleSelectedIds, setMultipleSelectedIds] = useState<string[]>([
    'development',
  ]);

  return (
    <section>
      <h3>Examples</h3>

      <h4>Basic Tree View</h4>
      <p>
        A hierarchical tree with expandable and collapsible branches. Use the
        arrow keys to navigate the visible items.
      </p>

      <TreeView items={basicItems} ariaLabel="File and folder hierarchy" />

      <h4>Initially Expanded Items</h4>
      <p>
        Use defaultExpandedIds to specify which branches are expanded when the
        tree is first rendered.
      </p>

      <TreeView
        items={basicItems}
        ariaLabel="File hierarchy with initially expanded folders"
        defaultExpandedIds={['documents', 'work', 'pictures']}
      />

      <h4>Single Selection</h4>
      <p>
        Select one item at a time using Enter or Space. Selecting another item
        replaces the previous selection.
      </p>

      <TreeView
        items={organizationItems}
        ariaLabel="Organization hierarchy with single selection"
        selectionMode="single"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        defaultExpandedIds={['executive', 'technology']}
      />

      <p aria-live="polite">
        Selected item: {selectedIds.length > 0 ? selectedIds[0] : 'None'}
      </p>

      <h4>Multiple Selection</h4>
      <p>Select or deselect multiple items using Enter or Space.</p>

      <TreeView
        items={organizationItems}
        ariaLabel="Organization hierarchy with multiple selection"
        selectionMode="multiple"
        selectedIds={multipleSelectedIds}
        onSelectionChange={setMultipleSelectedIds}
        defaultExpandedIds={['executive', 'operations', 'technology']}
      />

      <p aria-live="polite">
        Selected items:{' '}
        {multipleSelectedIds.length > 0
          ? multipleSelectedIds.join(', ')
          : 'None'}
      </p>

      <h4>Disabled Items</h4>
      <p>
        Disabled items remain available for keyboard navigation but cannot be
        selected or expanded.
      </p>

      <TreeView
        items={disabledItems}
        ariaLabel="Tree containing disabled items"
        selectionMode="single"
        defaultExpandedIds={['available']}
      />

      <h4>Controlled Expansion</h4>
      <p>
        The expanded state can be managed by the parent component using
        expandedIds and onExpandedChange.
      </p>

      <TreeView
        items={basicItems}
        ariaLabel="Tree with controlled expansion"
        expandedIds={expandedIds}
        onExpandedChange={setExpandedIds}
      />
    </section>
  );
}
