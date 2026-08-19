import { PageLayout } from '../components';
import { ButtonExamples } from '../examples';

export function ButtonPage() {
  return (
    <>
      <PageLayout title="Button Examples">
        <p>
          A reusable button component with semantic HTML, keyboard support,
          visible focus styling, and disabled-state handling.
        </p>
        <ButtonExamples />
      </PageLayout>
    </>
  );
}
