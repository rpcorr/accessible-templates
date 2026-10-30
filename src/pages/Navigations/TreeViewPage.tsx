import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { TreeViewExamples } from './examples/TreeViewExamples';

export function TreeViewPage() {
  return (
    <PageLayout
      title="Tree View"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Tree View</BreadcrumbItem>
        </>
      }
    >
      <p>
        The Tree View component provides an accessible way to display and
        navigate hierarchical information. It supports expandable and
        collapsible branches, keyboard navigation, and optional single or
        multiple selection.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>
          Follows the ARIA Tree View pattern using <code>role="tree"</code>,
          <code> role="treeitem"</code>, and <code> role="group"</code>.
        </li>
        <li>
          Provides an accessible name for the tree using <code>aria-label</code>
          .
        </li>
        <li>
          Uses roving tab index so only one tree item participates in the normal
          Tab sequence.
        </li>
        <li>
          Communicates expanded and collapsed states using{' '}
          <code>aria-expanded</code>.
        </li>
        <li>
          Communicates selection using <code>aria-selected</code> when selection
          is enabled.
        </li>
        <li>
          Identifies disabled items using <code>aria-disabled</code>.
        </li>
        <li>
          Provides hierarchical information using <code>aria-level</code>,
          <code> aria-posinset</code>, and <code> aria-setsize</code>.
        </li>
        <li>Provides individual accessible names for tree items.</li>
        <li>Provides a visible keyboard focus indicator.</li>
        <li>Supports responsive layouts and reduced-motion preferences.</li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>Tab moves focus into and out of the tree.</li>
        <li>Arrow Down moves focus to the next visible tree item.</li>
        <li>Arrow Up moves focus to the previous visible tree item.</li>
        <li>Arrow Right expands a collapsed parent item.</li>
        <li>
          Arrow Right on an expanded parent moves focus to its first child.
        </li>
        <li>Arrow Left collapses an expanded parent item.</li>
        <li>
          Arrow Left on a collapsed parent or child moves focus to its parent.
        </li>
        <li>Home moves focus to the first visible tree item.</li>
        <li>End moves focus to the last visible tree item.</li>
        <li>
          Enter or Space selects the focused item when selection is enabled.
        </li>
        <li>
          Asterisk (*) expands all sibling parent items at the current level.
        </li>
      </ul>

      <TreeViewExamples />
    </PageLayout>
  );
}
