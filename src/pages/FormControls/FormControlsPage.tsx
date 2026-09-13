import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { Link } from 'react-router';

export function FormControlsPage() {
  return (
    <PageLayout
      title="Form Controls"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/form-controls">Form Controls</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          Accessible form controls for collecting, entering, selecting, and
          editing user input.
        </p>

        <h3>Components</h3>

        <ul>
          <li>
            <strong>
              <Link to="/form-controls/checkbox">Checkbox</Link>
            </strong>
            <p>
              A control that allows users to select or deselect one or more
              options.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/form-controls/combobox">Combobox</Link>
            </strong>
            <p>
              An editable input that allows users to filter and select from a
              list of options.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/form-controls/number-input">Number Input</Link>
            </strong>
            <p>A single-line input for entering and editing numeric values.</p>
          </li>

          <li>
            <strong>
              <Link to="/form-controls/radio-group">Radio Group</Link>
            </strong>
            <p>
              A group of mutually exclusive options where users can select one
              choice.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/form-controls/select">Select</Link>
            </strong>
            <p>A control that allows users to choose an option from a list.</p>
          </li>

          <li>
            <strong>
              <Link to="/form-controls/slider">Slider</Link>
            </strong>
            <p>
              A control that allows users to select a numeric value within a
              defined range.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/form-controls/switch">Switch</Link>
            </strong>
            <p>A control for toggling a setting between on and off states.</p>
          </li>

          <li>
            <strong>
              <Link to="/form-controls/textarea">Textarea</Link>
            </strong>
            <p>A multi-line input for entering and editing longer text.</p>
          </li>

          <li>
            <strong>
              <Link to="/form-controls/text-input">Text Input</Link>
            </strong>
            <p>A single-line input for entering and editing text.</p>
          </li>
        </ul>
      </main>
    </PageLayout>
  );
}
