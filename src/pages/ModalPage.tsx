import { PageLayout } from '../components/PageLayout/PageLayout';
import { ModalExamples } from '../examples';

export function ModalPage() {
  return (
    <PageLayout title="Modal Dialog">
      <p>
        Accessible modal dialogs with focus trapping, Escape key handling, focus
        restoration, and configurable dismissal behaviour.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>
          Uses the semantic dialog role with <code>aria-modal="true"</code>.
        </li>
        <li>Traps keyboard focus inside the modal while it is open.</li>
        <li>Supports closing with the Escape key when dismissal is allowed.</li>
        <li>Restores focus to the element that opened the modal.</li>
        <li>Supports non-dismissible dialogs when required.</li>
      </ul>
      <ModalExamples />
    </PageLayout>
  );
}
