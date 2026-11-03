import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { ColourPickerExamples } from '../../components/FormControls/ColourPicker/Examples/ColourPickerExamples';

export function ColourPickerPage() {
  return (
    <PageLayout
      title="Colour Picker"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Colour Picker</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible colour picker component that allows users to select a
        colour using the browser's native colour selection interface or enter a
        hexadecimal colour value manually.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          The Colour Picker uses a native{' '}
          <code>&lt;input type="color"&gt;</code> element, providing built-in
          accessibility semantics and keyboard interaction.
        </p>

        <p>
          The colour input is associated with a visible label using a{' '}
          <code>&lt;label&gt;</code> element. When enabled, the optional HEX
          text input has its own accessible label. Helper text and validation
          messages are associated with the inputs using{' '}
          <code>aria-describedby</code>.
        </p>

        <h3>Colour Selection</h3>

        <p>
          Users can select a colour through the browser's native colour picker.
          The component also supports an optional text input for entering a
          six-digit hexadecimal colour value. The selected colour is displayed
          as a HEX value.
        </p>

        <h3>Component States</h3>

        <p>
          The Colour Picker supports controlled and uncontrolled usage, required
          and disabled states, helper text, and validation error messages. The
          optional HEX text input can be hidden when manual colour entry is not
          required. Invalid or incomplete HEX entries are handled without
          changing the last valid selected colour.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          The native colour input retains the browser's keyboard interaction.
          Users can press <kbd>Tab</kbd> to move focus between the colour picker
          and optional HEX input. The browser's colour selection interface
          provides its own keyboard interaction.
        </p>

        <h3>Focus Management</h3>

        <p>
          Both interactive inputs provide a visible <code>:focus-visible</code>{' '}
          indicator when focused using the keyboard, helping users identify the
          currently focused control.
        </p>
      </div>

      <ColourPickerExamples />
    </PageLayout>
  );
}
