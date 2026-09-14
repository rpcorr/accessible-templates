import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { ProgressIndicatorExamples } from '../../examples';

export function ProgressIndicatorPage() {
  return (
    <PageLayout
      title="Progress Indicator"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Progress Indicator</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible progress indicator for communicating the progress of
        ongoing operations, with support for determinate and indeterminate
        progress, accessible labels, optional visible progress values, multiple
        visual presentations including linear, circular, icon, and
        fill-container progress, customizable colour variants, and an optional
        wavy leading edge for linear and fill progress.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          The Progress Indicator uses <code>role="progressbar"</code> to
          communicate progress information to screen readers and other assistive
          technologies.
        </p>

        <p>
          Determinate progress provides <code>aria-valuenow</code>,
          <code>aria-valuemin</code>, and <code>aria-valuemax</code> so the
          current progress and its range can be communicated to assistive
          technology.
        </p>

        <p>
          Indeterminate progress does not provide <code>aria-valuenow</code>
          because the amount of progress is unknown. The accessible label
          communicates what operation is currently in progress.
        </p>

        <p>
          The progress indicator can be given an accessible label using the
          <code>label</code> prop. A visible percentage can optionally be
          displayed using <code>showValue</code>.
        </p>

        <h3>Progress Variants</h3>

        <p>
          The Progress Indicator supports several visual presentations. The
          <code>linear</code> variant displays progress as a horizontal bar,
          <code>circular</code> displays progress around a circle,
          <code>icon</code> displays a movable icon along the progress track,
          and <code>fill</code> displays progress as a container filling from
          the bottom upward.
        </p>

        <h3>Wavy Progress</h3>

        <p>
          The optional <code>wavy</code> prop adds a wavy leading edge to the
          progress indicator. When used with the <code>linear</code> variant,
          the filled portion has a wavy edge at the end of the progress bar.
          When used with the <code>fill</code> variant, the filled portion has a
          wavy edge along the top.
        </p>

        <p>
          Wavy progress is a visual enhancement and can be combined with any
          supported colour variant. It does not change the progress value or
          accessibility information communicated by the progress indicator.
        </p>

        <h3>Colour Variants</h3>

        <p>
          The Progress Indicator supports customizable colour variants including
          <code>default</code>, <code>success</code>, <code>warning</code>,
          <code>error</code>, and <code>info</code>. Colour is used as a visual
          enhancement and is not relied upon as the sole means of communicating
          progress or status.
        </p>

        <h3>Determinate Progress</h3>

        <p>
          Use determinate progress when the amount of completed work is known.
          The <code>value</code> represents the current progress and defaults to
          a maximum of <code>100</code>.
        </p>

        <h3>Indeterminate Progress</h3>

        <p>
          Use indeterminate progress when the operation is ongoing but its
          completion percentage cannot be determined. Omitting the
          <code>value</code> prop creates an indeterminate progress indicator.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          The Progress Indicator is not interactive and does not receive
          keyboard focus. No keyboard interaction is required.
        </p>

        <h3>Reduced Motion</h3>

        <p>
          Animated progress presentations use motion to communicate ongoing
          activity or changes in progress. Animations and transitions are
          reduced or disabled when the user has enabled
          <code>prefers-reduced-motion</code>.
        </p>
      </div>

      <ProgressIndicatorExamples />
    </PageLayout>
  );
}
