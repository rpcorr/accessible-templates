import { PageLayout } from '../components/PageLayout/PageLayout';
import { SwitchExamples } from '../examples';

export function SwitchPage() {
  return (
    <PageLayout title="Switch">
      <main className="stack">
        <p>
          An accessible switch component that allows users to toggle a setting
          between on and off states. Users can toggle the switch using the
          keyboard or mouse. The Switch also supports colour variants to provide
          different visual styles for the on state.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Switch uses a native checkbox input with the <code>switch</code>{' '}
          role, providing appropriate semantics for assistive technologies.
        </p>

        <p>
          The input is associated with its visible label using a native{' '}
          <code>&lt;label&gt;</code> element. An optional description is
          associated with the input using <code>aria-describedby</code>.
        </p>

        <p>
          The visual switch track and thumb are decorative and hidden from
          assistive technologies using <code>aria-hidden="true"</code>. Colour
          is used only as a visual indication and does not communicate the
          switch state by itself.
        </p>

        <h3>States</h3>

        <p>
          The Switch supports checked and unchecked states, default values,
          controlled values, disabled and required states, optional
          descriptions, and colour variants.
        </p>

        <p>
          Available colour variants are <code>default</code>,{' '}
          <code>success</code>,<code>warning</code>, <code>error</code>, and{' '}
          <code>info</code>.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          <kbd>Space</kbd> toggles the Switch between its on and off states.
          <kbd>Tab</kbd> moves focus to and from the Switch.
        </p>

        <h3>Examples</h3>

        <SwitchExamples />
      </main>
    </PageLayout>
  );
}
