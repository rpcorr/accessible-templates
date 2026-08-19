import { PageLayout } from '../components/PageLayout/PageLayout';
import { ModalExamples } from '../examples';

export function ModalPage() {
  return (
    <PageLayout title="Modal Dialog Examples">
      <p>
        Accessible modal dialogs with focus trapping, Escape key handling, focus
        restoration, and configurable dismissal behaviour.
      </p>
      <ModalExamples />
    </PageLayout>
  );
}
