import { PageLayout } from '../components/PageLayout/PageLayout';
import { ButtonExamples } from '../examples';

export function ButtonPage() {
  return (
    <PageLayout title="Button">
      <p>
        A reusable button component with semantic HTML, keyboard support,
        visible focus styling, and disabled-state handling.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>Uses a native HTML button element.</li>
        <li>Can be operated with a keyboard.</li>
        <li>Provides a visible focus indicator.</li>
        <li>Supports a disabled state.</li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>Tab moves focus to and from the button.</li>
        <li>Enter activates the button.</li>
        <li>Space activates the button.</li>
      </ul>

      <ButtonExamples />
    </PageLayout>
  );
}
