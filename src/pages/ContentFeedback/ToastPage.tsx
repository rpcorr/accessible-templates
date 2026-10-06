import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { ToastExamples } from './examples/ToastExamples';

export function ToastPage() {
  return (
    <PageLayout
      title="Toast"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Toast</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          A toast is a temporary notification used to communicate dynamic
          information, such as the result of an action or a change in
          application state.
        </p>

        <h3>Accessibility</h3>
        <p>
          Toast notifications use persistent ARIA live regions to communicate
          updates to assistive technologies. Informational, successful, and
          warning notifications are announced politely, while error
          notifications are announced assertively.
        </p>
        <p>
          Toasts do not automatically receive keyboard focus when they appear.
          This prevents an unexpected interruption to the user's current
          interaction. Interactive elements within a toast, such as the dismiss
          and action buttons, remain keyboard accessible.
        </p>
        <p>
          When a user dismisses a toast or activates its action, keyboard focus
          is restored to the element that had focus when the toast was created.
          Automatically dismissed toasts do not move keyboard focus.
        </p>
        <p>
          Each toast includes an accessible dismiss button. Toasts can
          automatically disappear after a configurable duration, or remain
          visible when the duration is set to <code>0</code>.
        </p>

        <h3>Usage</h3>
        <p>
          The <code>ToastProvider</code> manages active notifications and
          controls their position and maximum number. Components can use the{' '}
          <code>useToast</code> hook to create and dismiss notifications.
        </p>
        <p>
          Toasts should be used for temporary status updates that do not require
          the user to stop their current task. Important information that must
          remain visible should generally use an <code>Alert</code> instead.
        </p>

        <h3>Behavior</h3>
        <p>
          Toasts can be configured to automatically dismiss after a specified
          duration. Setting the duration to <code>0</code> creates a persistent
          toast that remains visible until it is dismissed.
        </p>
        <p>
          Toasts pause their dismissal timer while the pointer is over the
          notification or while an interactive element within the notification
          has focus. This gives users additional time to read and interact with
          the content.
        </p>
        <p>
          Multiple toast notifications can be displayed at the same time. The{' '}
          <code>ToastProvider</code> limits the number of simultaneously
          displayed notifications using the <code>maxToasts</code> property.
        </p>

        <h3>Positions</h3>
        <p>
          Toast notifications can be displayed in the top-left, top-center,
          top-right, bottom-left, bottom-center, or bottom-right position of the
          viewport.
        </p>

        <h3>Keyboard Support</h3>
        <p>
          Toast notifications do not move keyboard focus when they appear. Users
          can use <kbd>Tab</kbd> to move to interactive elements within a toast,
          including the action and dismiss buttons.
        </p>
        <p>
          The dismiss and action buttons can be activated using <kbd>Enter</kbd>{' '}
          or <kbd>Space</kbd>. After a user-initiated dismissal or action, focus
          is restored to the element that had focus when the toast was created.
        </p>

        <h3>Examples</h3>
        <ToastExamples />
      </main>
    </PageLayout>
  );
}
