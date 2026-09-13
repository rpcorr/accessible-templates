import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { LoadingSpinnerExamples } from '../../examples';

export function LoadingSpinnerPage() {
  return (
    <PageLayout
      title="Loading Spinner"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/content-feedback">
            Content Feedback
          </BreadcrumbItem>
          <BreadcrumbItem current>Loading Spinner</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible loading indicator for communicating that an operation is
        currently in progress when the amount of progress cannot be determined.
        The component supports multiple animation variants, sizes, colour
        variants, accessible labels, optional visible labels, and reduced-motion
        preferences.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>
          Uses <code>role="status"</code> to communicate the loading state to
          screen readers and other assistive technologies.
        </li>
        <li>
          Provides an accessible loading label using the <code>label</code>{' '}
          prop.
        </li>
        <li>
          Hides the visual loading indicator from the accessibility tree using{' '}
          <code>aria-hidden="true"</code>.
        </li>
        <li>
          Supports optional visible loading messages using the{' '}
          <code>showLabel</code> prop.
        </li>
        <li>
          Does not receive keyboard focus because the component is not
          interactive.
        </li>
        <li>
          Respects <code>prefers-reduced-motion</code> by disabling loading
          animations when reduced motion is requested.
        </li>
      </ul>

      <h3>Animation Variants</h3>

      <p>
        The Loading Spinner supports six visual presentations using the{' '}
        <code>variant</code> prop.
      </p>

      <table className="docTable">
        <thead>
          <tr>
            <th>Variant</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>spinner</code>
            </td>
            <td>Rotating circular spinner. This is the default variant.</td>
          </tr>
          <tr>
            <td>
              <code>dots</code>
            </td>
            <td>Three animated dots that pulse in sequence.</td>
          </tr>
          <tr>
            <td>
              <code>pulse</code>
            </td>
            <td>A circular indicator that expands and contracts.</td>
          </tr>
          <tr>
            <td>
              <code>bars</code>
            </td>
            <td>Three vertical bars that animate at different heights.</td>
          </tr>
          <tr>
            <td>
              <code>orbit</code>
            </td>
            <td>
              A circular arrangement of dots that fade progressively as they
              rotate around the centre.
            </td>
          </tr>
          <tr>
            <td>
              <code>comet</code>
            </td>
            <td>
              A leading dot followed by a progressively fading trail that
              travels around a circular path.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Size Variants</h3>

      <p>
        The Loading Spinner supports three sizes using the <code>size</code>{' '}
        prop.
      </p>

      <table className="docTable">
        <thead>
          <tr>
            <th>Size</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>small</code>
            </td>
            <td>Small loading indicator for compact interfaces.</td>
          </tr>
          <tr>
            <td>
              <code>medium</code>
            </td>
            <td>Default loading indicator size for general use.</td>
          </tr>
          <tr>
            <td>
              <code>large</code>
            </td>
            <td>Larger loading indicator for prominent loading states.</td>
          </tr>
        </tbody>
      </table>

      <h3>Colour Variants</h3>

      <p>
        The Loading Spinner supports five colour variants using the{' '}
        <code>colour</code> prop.
      </p>

      <table className="docTable">
        <thead>
          <tr>
            <th>Colour</th>
            <th>Typical Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>default</code>
            </td>
            <td>Uses the current text colour.</td>
          </tr>
          <tr>
            <td>
              <code>success</code>
            </td>
            <td>Indicates a successful or positive loading context.</td>
          </tr>
          <tr>
            <td>
              <code>warning</code>
            </td>
            <td>Indicates a warning or attention-required context.</td>
          </tr>
          <tr>
            <td>
              <code>error</code>
            </td>
            <td>Indicates an error-related loading context.</td>
          </tr>
          <tr>
            <td>
              <code>info</code>
            </td>
            <td>Provides an informational loading context.</td>
          </tr>
        </tbody>
      </table>

      <h3>Accessible Labels</h3>

      <p>
        Use the <code>label</code> prop to provide a meaningful description of
        the operation currently in progress. The default label is{' '}
        <code>Loading</code>.
      </p>

      <p>
        The loading message can optionally be displayed visually alongside the
        indicator using the <code>showLabel</code> prop.
      </p>

      <h3>Keyboard Support</h3>

      <p>
        The Loading Spinner is not interactive and does not receive keyboard
        focus. No keyboard interaction is required.
      </p>

      <h3>Reduced Motion</h3>

      <p>
        Loading animations are disabled when the user has enabled{' '}
        <code>prefers-reduced-motion</code>. This prevents unnecessary motion
        while preserving the loading status for assistive technologies.
      </p>

      <LoadingSpinnerExamples />
    </PageLayout>
  );
}
