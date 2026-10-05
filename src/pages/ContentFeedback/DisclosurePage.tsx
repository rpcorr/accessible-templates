import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { DisclosureExamples } from './examples/DisclosureExamples';

export function DisclosurePage() {
  return (
    <PageLayout
      title="Disclosure"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Disclosure</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          A Disclosure is an interactive control that allows users to show or
          hide a section of related content.
        </p>

        <h3>Accessibility</h3>
        <p>
          The Disclosure uses a native <code>button</code> as its trigger. The
          button communicates the current state using <code>aria-expanded</code>{' '}
          and identifies the associated content using <code>aria-controls</code>
          .
        </p>
        <p>
          Because the trigger is a native button, it provides standard keyboard
          interaction without requiring custom keyboard event handling.
        </p>

        <h3>Behavior</h3>
        <p>
          The Disclosure can be opened and closed by activating its trigger.
          Content is displayed when the Disclosure is open and hidden when it is
          closed.
        </p>
        <p>
          The component supports both controlled and uncontrolled usage. Use{' '}
          <code>defaultOpen</code> when the Disclosure should initially be open,
          or use <code>open</code> and <code>onOpenChange</code> when the parent
          component needs to control its state.
        </p>

        <h3>Keyboard Support</h3>
        <p>
          The Disclosure trigger uses a native button, so it supports standard
          keyboard interaction:
        </p>
        <ul>
          <li>
            <kbd>Tab</kbd> moves focus to the Disclosure trigger.
          </li>
          <li>
            <kbd>Enter</kbd> toggles the Disclosure.
          </li>
          <li>
            <kbd>Space</kbd> toggles the Disclosure.
          </li>
        </ul>

        <h3>States</h3>
        <p>
          The Disclosure supports closed, open, controlled, initially open, and
          disabled states.
        </p>

        <h3>Content</h3>
        <p>
          The Disclosure accepts React content as its children. The content can
          contain text, headings, lists, links, or other appropriate HTML
          elements.
        </p>

        <h3>Focus</h3>
        <p>
          The Disclosure trigger has a visible focus indicator when it receives
          keyboard focus. The focus indicator is applied to the interactive
          button rather than the surrounding container.
        </p>

        <h3>Examples</h3>
        <DisclosureExamples />
      </main>
    </PageLayout>
  );
}
