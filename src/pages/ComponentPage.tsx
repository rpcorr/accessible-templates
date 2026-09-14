import { Link } from 'react-router';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../components/Navigations/Breadcrumbs';
import styles from './ComponentPage.module.css';
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
        <p className={styles.intro}>
          Explore the accessible UI components available in the Accessible
          Templates project.
        </p>
        <div className={styles.grid}>
          <section
            className={styles.card}
            aria-labelledby="buttons-actions-heading"
          >
            <h3 id="buttons-actions-heading">Buttons & Actions</h3>
            <p>
              Accessible components for triggering actions, submitting forms,
              and interacting with interface controls.
            </p>
            <ul className={styles.componentList}>
              <li>
                <Link to="/buttons-actions/button">Button</Link>
                <span>
                  An accessible button for triggering an action or submitting a
                  form.
                </span>
              </li>
            </ul>
          </section>
          <section
            className={styles.card}
            aria-labelledby="content-feedback-heading"
          >
            <h3 id="content-feedback-heading">Content & Feedback</h3>
            <p>
              Accessible components for presenting information, communicating
              status, and providing feedback about user actions or system
              processes.
            </p>
            <ul className={styles.componentList}>
              <li>
                <Link to="/content-feedback/accordion">Accordion</Link>
                <span>
                  An expandable and collapsible section for showing and hiding
                  related content.
                </span>
              </li>
              <li>
                <Link to="/content-feedback/alert">Alert</Link>
                <span>
                  A component for communicating important messages and feedback
                  to users.
                </span>
              </li>
              <li>
                <Link to="/content-feedback/loading-spinner">
                  Loading Spinner
                </Link>
                <span>
                  A visual indicator that communicates that an operation is in
                  progress.
                </span>
              </li>
              <li>
                <Link to="/content-feedback/progress-indicator">
                  Progress Indicator
                </Link>
                <span>
                  A component for communicating the progress of an operation or
                  task.
                </span>
              </li>
              <li>
                <Link to="/content-feedback/status">Status</Link>
                <span>
                  A component for communicating the current status of an item or
                  process.
                </span>
              </li>
              <li>
                <Link to="/content-feedback/tab">Tabs</Link>
                <span>
                  A component for organizing related content into selectable
                  sections.
                </span>
              </li>
            </ul>
          </section>
          <section
            className={styles.card}
            aria-labelledby="form-controls-heading"
          >
            <h3 id="form-controls-heading">Form Controls</h3>
            <p>
              Accessible form controls for collecting, entering, selecting, and
              editing user input.
            </p>
            <ul className={styles.componentList}>
              <li>
                <Link to="/form-controls/checkbox">Checkbox</Link>
                <span>
                  A control that allows users to select or deselect one or more
                  options.
                </span>
              </li>
              <li>
                <Link to="/form-controls/combobox">Combobox</Link>
                <span>
                  An editable input that allows users to filter and select from
                  a list of options.
                </span>
              </li>
              <li>
                <Link to="/form-controls/number-input">Number Input</Link>
                <span>
                  A single-line input for entering and editing numeric values.
                </span>
              </li>
              <li>
                <Link to="/form-controls/radio-group">Radio Group</Link>
                <span>
                  A group of mutually exclusive options where users can select
                  one choice.
                </span>
              </li>
              <li>
                <Link to="/form-controls/select">Select</Link>
                <span>
                  A control that allows users to choose an option from a list.
                </span>
              </li>
              <li>
                <Link to="/form-controls/slider">Slider</Link>
                <span>
                  A control that allows users to select a numeric value within a
                  defined range.
                </span>
              </li>
              <li>
                <Link to="/form-controls/switch">Switch</Link>
                <span>
                  A control for toggling a setting between on and off states.
                </span>
              </li>
              <li>
                <Link to="/form-controls/text-input">Text Input</Link>
                <span>A single-line input for entering and editing text.</span>
              </li>
              <li>
                <Link to="/form-controls/textarea">Textarea</Link>
                <span>
                  A multi-line input for entering and editing longer text.
                </span>
              </li>
            </ul>
          </section>
          <section className={styles.card} aria-labelledby="navigation-heading">
            <h3 id="navigation-heading">Navigation</h3>
            <p>
              Accessible components that help users understand their location,
              move between pages, and navigate interface content.
            </p>
            <ul className={styles.componentList}>
              <li>
                <Link to="/navigations/breadcrumbs">Breadcrumbs</Link>
                <span>
                  A navigational trail that communicates the user's location
                  within a website or application.
                </span>
              </li>
              <li>
                <Link to="/navigations/navigation">Navigation</Link>
                <span>
                  A component for providing links to pages or sections of an
                  application.
                </span>
              </li>
              <li>
                <Link to="/navigations/pagination">Pagination</Link>
                <span>
                  A control for navigating between pages of related content.
                </span>
              </li>
            </ul>
          </section>
          <section
            className={styles.card}
            aria-labelledby="overlays-menus-heading"
          >
            <h3 id="overlays-menus-heading">Overlays & Menus</h3>
            <p>
              Accessible components for displaying additional content,
              presenting actions, and managing temporary interface layers.
            </p>
            <ul className={styles.componentList}>
              <li>
                <Link to="/overlays-menus/dropdown">Dropdown</Link>
                <span>
                  A menu component for presenting a list of actions or options.
                </span>
              </li>
              <li>
                <Link to="/overlays-menus/modal">Modal Dialog</Link>
                <span>
                  A dialog that temporarily interrupts the page to present
                  information or request user interaction.
                </span>
              </li>
              <li>
                <Link to="/overlays-menus/tooltip">Tooltip</Link>
                <span>
                  A component for providing additional contextual information
                  about an interface element.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </PageLayout>
  );
}
