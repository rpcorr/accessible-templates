import { Link } from 'react-router';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../components/Navigations/Breadcrumbs';

export function ComponentPage() {
  return (
    <PageLayout
      title="Components"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem current>Components</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          Explore the accessible UI components available in the Accessible
          Templates project.
        </p>

        <section aria-labelledby="buttons-actions-heading">
          <h3 id="buttons-actions-heading">Buttons & Actions</h3>

          <p>
            Accessible components for triggering actions, submitting forms, and
            interacting with interface controls.
          </p>

          <ul>
            <li>
              <Link to="/buttons-actions/button">Button</Link>
              <p>
                An accessible button for triggering an action or submitting a
                form.
              </p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="content-feedback-heading">
          <h3 id="content-feedback-heading">Content & Feedback</h3>

          <p>
            Accessible components for presenting information, communicating
            status, and providing feedback about user actions or system
            processes.
          </p>

          <ul>
            <li>
              <Link to="/content-feedback/accordion">Accordion</Link>
              <p>
                An expandable and collapsible section for showing and hiding
                related content.
              </p>
            </li>

            <li>
              <Link to="/content-feedback/alert">Alert</Link>
              <p>
                A component for communicating important messages and feedback to
                users.
              </p>
            </li>

            <li>
              <Link to="/content-feedback/loading-spinner">
                Loading Spinner
              </Link>
              <p>
                A visual indicator that communicates that an operation is in
                progress.
              </p>
            </li>

            <li>
              <Link to="/content-feedback/progress-indicator">
                Progress Indicator
              </Link>
              <p>
                A component for communicating the progress of an operation or
                task.
              </p>
            </li>

            <li>
              <Link to="/content-feedback/status">Status</Link>
              <p>
                A component for communicating the current status of an item or
                process.
              </p>
            </li>

            <li>
              <Link to="/content-feedback/tab">Tabs</Link>
              <p>
                A component for organizing related content into selectable
                sections.
              </p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="form-controls-heading">
          <h3 id="form-controls-heading">Form Controls</h3>

          <p>
            Accessible form controls for collecting, entering, selecting, and
            editing user input.
          </p>

          <ul>
            <li>
              <Link to="/form-controls/checkbox">Checkbox</Link>
              <p>
                A control that allows users to select or deselect one or more
                options.
              </p>
            </li>

            <li>
              <Link to="/form-controls/combobox">Combobox</Link>
              <p>
                An editable input that allows users to filter and select from a
                list of options.
              </p>
            </li>

            <li>
              <Link to="/form-controls/number-input">Number Input</Link>
              <p>
                A single-line input for entering and editing numeric values.
              </p>
            </li>

            <li>
              <Link to="/form-controls/radio-group">Radio Group</Link>
              <p>
                A group of mutually exclusive options where users can select one
                choice.
              </p>
            </li>

            <li>
              <Link to="/form-controls/select">Select</Link>
              <p>
                A control that allows users to choose an option from a list.
              </p>
            </li>

            <li>
              <Link to="/form-controls/slider">Slider</Link>
              <p>
                A control that allows users to select a numeric value within a
                defined range.
              </p>
            </li>

            <li>
              <Link to="/form-controls/switch">Switch</Link>
              <p>A control for toggling a setting between on and off states.</p>
            </li>

            <li>
              <Link to="/form-controls/text-input">Text Input</Link>
              <p>A single-line input for entering and editing text.</p>
            </li>

            <li>
              <Link to="/form-controls/textarea">Textarea</Link>
              <p>A multi-line input for entering and editing longer text.</p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="navigation-heading">
          <h3 id="navigation-heading">Navigation</h3>

          <p>
            Accessible components that help users understand their location,
            move between pages, and navigate interface content.
          </p>

          <ul>
            <li>
              <Link to="/navigations/breadcrumbs">Breadcrumbs</Link>
              <p>
                A navigational trail that communicates the user's location
                within a website or application.
              </p>
            </li>

            <li>
              <Link to="/navigations/navigation">Navigation</Link>
              <p>
                A component for providing links to pages or sections of an
                application.
              </p>
            </li>

            <li>
              <Link to="/navigations/pagination">Pagination</Link>
              <p>A control for navigating between pages of related content.</p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="overlays-menus-heading">
          <h3 id="overlays-menus-heading">Overlays & Menus</h3>

          <p>
            Accessible components for displaying additional content, presenting
            actions, and managing temporary interface layers.
          </p>

          <ul>
            <li>
              <Link to="/overlays-menus/dropdown">Dropdown</Link>
              <p>
                A menu component for presenting a list of actions or options.
              </p>
            </li>

            <li>
              <Link to="/overlays-menus/modal">Modal Dialog</Link>
              <p>
                A dialog that temporarily interrupts the page to present
                information or request user interaction.
              </p>
            </li>

            <li>
              <Link to="/overlays-menus/tooltip">Tooltip</Link>
              <p>
                A component for providing additional contextual information
                about an interface element.
              </p>
            </li>
          </ul>
        </section>
      </main>
    </PageLayout>
  );
}
