import { List } from '../../../../components/DataDisplay/List';
import styles from '../../../../components/DataDisplay/List/List.module.css';

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 10.5L8 14.5L16 5.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WarningIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L22 21H2L12 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 9V14M12 17H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M12 5L19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ListExamples() {
  return (
    <div className="stack">
      <h3>Unordered List</h3>

      <List
        items={['Accessible navigation', 'Semantic HTML', 'Keyboard support']}
      />

      <h3>Ordered List</h3>

      <List
        variant="ordered"
        items={[
          'Review the requirements',
          'Implement the component',
          'Test with assistive technology',
        ]}
      />

      <h3>List Without Markers</h3>

      <List
        listStyle="none"
        items={['First item', 'Second item', 'Third item']}
      />

      <h3>Unordered List with Circle Markers</h3>

      <List listStyle="circle" items={['Design', 'Development', 'Testing']} />

      <h3>Ordered List with Decimal Markers</h3>

      <List
        variant="ordered"
        listStyle="decimal"
        items={['First step', 'Second step', 'Third step']}
      />

      <h3>List with Rich Content</h3>

      <List
        items={[
          <>
            <strong>Semantic HTML:</strong> use the correct element for the
            content.
          </>,
          <>
            <strong>Keyboard access:</strong> ensure interactive controls are
            keyboard accessible.
          </>,
          <>
            <strong>Testing:</strong> verify behaviour with assistive
            technologies.
          </>,
        ]}
      />

      <h3>Checkmark List</h3>

      <List
        listStyle="none"
        items={[
          <span className={styles.listWithIcon}>
            <CheckIcon />
            Semantic HTML structure
          </span>,
          <span className={styles.listWithIcon}>
            <CheckIcon />
            Keyboard-accessible interactions
          </span>,
          <span className={styles.listWithIcon}>
            <CheckIcon />
            Screen reader compatibility
          </span>,
        ]}
      />

      <h3>Warning List</h3>

      <List
        listStyle="none"
        items={[
          <span className={`${styles.listWithIcon} ${styles.warningIcon}`}>
            <WarningIcon />
            Review form fields before submitting
          </span>,
          <span className={`${styles.listWithIcon} ${styles.warningIcon}`}>
            <WarningIcon />
            Provide text alternatives for meaningful images
          </span>,
          <span className={`${styles.listWithIcon} ${styles.warningIcon}`}>
            <WarningIcon />
            Ensure error messages identify the problem
          </span>,
        ]}
      />

      <h3>Process Steps with Arrows</h3>

      <List
        listStyle="none"
        items={[
          <span className={`${styles.listWithIcon} ${styles.arrowIcon}`}>
            <ArrowIcon />
            Review the requirements
          </span>,
          <span className={`${styles.listWithIcon} ${styles.arrowIcon}`}>
            <ArrowIcon />
            Implement the solution
          </span>,
          <span className={`${styles.listWithIcon} ${styles.arrowIcon}`}>
            <ArrowIcon />
            Test keyboard and screen reader access
          </span>,
        ]}
      />
    </div>
  );
}
