import { PageLayout } from '../components/PageLayout/PageLayout';
import { SliderExamples } from '../examples';

export function SliderPage() {
  return (
    <PageLayout title="Slider">
      <main className="stack">
        <p>
          An accessible single-value slider that allows users to select a
          numeric value from a defined range. The Slider uses the native HTML
          range input and supports keyboard and mouse interaction.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Slider uses a native <code>&lt;input type="range"&gt;</code>,
          which provides the appropriate slider semantics and accessibility
          information to assistive technologies.
        </p>

        <p>
          The input is associated with its visible label using a native{' '}
          <code>&lt;label&gt;</code> element. An optional description is
          associated with the input using <code>aria-describedby</code>.
        </p>

        <p>
          The current value can optionally be displayed alongside the label. The
          visible value is provided using the native <code>&lt;output&gt;</code>{' '}
          element.
        </p>

        <h3>Values</h3>

        <p>
          The Slider supports custom minimum and maximum values, step
          increments, default values, controlled values, and an optional visible
          value.
        </p>

        <p>
          By default, the Slider has a minimum value of <code>0</code>, a
          maximum value of <code>100</code>, a step of <code>1</code>, and a
          default value of <code>50</code>.
        </p>

        <h3>Colour Variants</h3>

        <p>
          The Slider supports colour variants to provide different visual
          styles. Available colour variants are <code>default</code>,{' '}
          <code>success</code>, <code>warning</code>, <code>error</code>, and{' '}
          <code>info</code>.
        </p>

        <p>
          Colour is used only as a visual styling option and does not
          communicate the Slider's value or state by itself. The Slider's value
          and semantics remain available through the native range input.
        </p>

        <h3>States</h3>

        <p>
          The Slider supports disabled and enabled states, optional
          descriptions, controlled and uncontrolled values, colour variants, and
          the option to hide the visible value.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          The native range input provides keyboard support.{' '}
          <kbd>Arrow Left</kbd> and <kbd>Arrow Down</kbd> decrease the value,
          while <kbd>Arrow Right</kbd> and <kbd>Arrow Up</kbd> increase the
          value.
        </p>

        <p>
          <kbd>Home</kbd> moves to the minimum value and <kbd>End</kbd> moves to
          the maximum value. <kbd>Page Up</kbd> and <kbd>Page Down</kbd> adjust
          the value by a larger increment.
        </p>

        <p>
          <kbd>Tab</kbd> moves focus to and from the Slider.
        </p>

        <h3>Examples</h3>

        <SliderExamples />
      </main>
    </PageLayout>
  );
}
