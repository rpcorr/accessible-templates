import { PageLayout } from '../../components/PageLayout/PageLayout';

import { TextareaExamples } from '../../components/FormControls/Textarea/Examples/TextareaExamples';

export function TextareaPage() {
  return (
    <PageLayout title="Textarea">
      <main className="stack">
        <p>
          An accessible multi-line text input that allows users to enter and
          edit longer amounts of text. The Textarea uses the native HTML
          <code> &lt;textarea&gt;</code> element and supports descriptions,
          error messages, validation constraints, character counting, automatic
          resizing, and common form states.
        </p>

        <p>
          <strong>Accessibility target:</strong> Designed and tested with WCAG
          2.2 Level AA accessibility requirements in mind.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Textarea uses a native <code>&lt;textarea&gt;</code> element,
          which provides appropriate semantics and accessibility information to
          assistive technologies.
        </p>

        <p>
          The textarea is associated with its visible label using a native{' '}
          <code>&lt;label&gt;</code> element. An optional description, error
          message, and character count are associated with the textarea using{' '}
          <code>aria-describedby</code> where applicable.
        </p>

        <p>
          When an error is provided, the textarea uses <code>aria-invalid</code>{' '}
          to communicate its invalid state to assistive technologies.
        </p>

        <p>
          The character count is available to screen-reader users when the
          textarea receives focus. It is not announced continuously as the user
          types, helping to avoid unnecessary interruptions.
        </p>

        <h3>States</h3>

        <p>
          The Textarea supports required, disabled, and read-only states. It
          also supports controlled and uncontrolled values.
        </p>

        <h3>Validation</h3>

        <p>
          The Textarea supports native <code>minLength</code> and{' '}
          <code>maxLength</code> constraints. It can also display a custom error
          message associated with the textarea when validation fails.
        </p>

        <h3>Character Count</h3>

        <p>
          The optional character counter can be enabled using the{' '}
          <code>showCharacterCount</code> prop together with{' '}
          <code>maxLength</code>. It displays the current number of characters
          and the maximum allowed length, updating as the user types.
        </p>

        <h3>Rows and Auto-Resizing</h3>

        <p>
          The Textarea supports a configurable number of visible rows. By
          default, users can resize the textarea vertically using the browser's
          native resize control.
        </p>

        <p>
          Automatic resizing can be enabled using the <code>autoResize</code>{' '}
          prop. When enabled, the textarea expands as content is entered and
          shrinks when content is removed. Manual resizing is disabled while
          automatic resizing is active.
        </p>

        <p>
          An optional <code>maxAutoResizeHeight</code> prop sets the maximum
          height in pixels. When the content exceeds this limit, the textarea
          stops expanding and enables vertical scrolling so users can continue
          entering and reviewing their text.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          The Textarea uses the native HTML textarea element for keyboard
          interaction. Users can move focus to and from the textarea using{' '}
          <kbd>Tab</kbd> and <kbd>Shift + Tab</kbd>. Text entry and editing
          retain the browser's native keyboard behaviour.
        </p>

        <h3>Examples</h3>

        <TextareaExamples />
      </main>
    </PageLayout>
  );
}
