import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { FileUploadExamples } from '../../components/FormControls/FileUpload/Examples/FileUploadExamples';

export function FileUploadPage() {
  return (
    <PageLayout
      title="File Upload"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>File Upload</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible file upload component that allows users to select files
          from their device for submission or further processing.
        </p>

        <p>
          <strong>Accessibility target:</strong> Designed and tested with WCAG
          2.2 Level AA accessibility requirements in mind.
        </p>

        <h3>Accessibility</h3>

        <p>
          The File Upload component uses a native{' '}
          <code>&lt;input type="file"&gt;</code> element, providing built-in
          support for file selection and browser accessibility features.
        </p>

        <p>
          The input is associated with its visible label using a{' '}
          <code>&lt;label&gt;</code> element. Any instructions or descriptions
          are associated with the input using <code>aria-describedby</code>.
        </p>

        <p>
          The native file input supports keyboard interaction and communicates
          its purpose and selected file information to assistive technologies.
        </p>

        <h3>File Selection</h3>

        <p>
          Users can select files from their device using the file selection
          dialog. The browser handles the file selection process and
          communicates the selected file information through the native input.
        </p>

        <p>
          Where supported, the component can restrict file selection using
          accepted file types and allow users to select multiple files.
        </p>

        <h3>States</h3>

        <p>
          The File Upload supports file selection, disabled input states, and
          the display of selected file information.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          Users can press <kbd>Tab</kbd> to move focus to and from the file
          input. <kbd>Enter</kbd> or <kbd>Space</kbd> can be used to open the
          file selection dialog when the input is focused, depending on browser
          and platform behaviour.
        </p>

        <p>
          The native file input behaviour is preserved so users can interact
          with the control using their preferred input method.
        </p>

        <h3>Examples</h3>

        <FileUploadExamples />
      </main>
    </PageLayout>
  );
}
