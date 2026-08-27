import { Accordion } from '../../components/Accordion';

export function AccordionExamples() {
  const items = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <p>
          This accordion provides expandable sections of content. Multiple
          sections can be open at the same time.
        </p>
      ),
    },
    {
      id: 'accessibility',
      title:
        'Accessibility Features, Keyboard Navigation, and Screen Reader Support',
      content: (
        <p>
          The Accordion component uses native buttons with aria-expanded and
          aria-controls to communicate the state and relationship between each
          trigger and its content panel.
        </p>
      ),
    },
    {
      id: 'keyboard',
      title: 'Keyboard Support',
      content: (
        <p>
          Keyboard users can move through the accordion triggers using the
          standard Tab key and activate a section using Enter or Space.
        </p>
      ),
    },
    {
      id: 'disabled',
      title: 'Disabled Section',
      disabled: true,
      content: (
        <p>
          This content should not be available because the accordion section is
          disabled.
        </p>
      ),
    },
    {
      id: 'documentation',
      title: 'Documentation',
      content: (
        <>
          <p>
            This section contains additional documentation and implementation
            guidance for the Accordion component.
          </p>

          <p>
            Each accordion item has a button that controls the visibility of its
            associated content panel. The button communicates whether the panel
            is expanded or collapsed using aria-expanded.
          </p>

          <h5>Accessibility Features</h5>

          <ul>
            <li>Native button controls</li>
            <li>Expanded and collapsed state announcements</li>
            <li>Associated content panels</li>
            <li>Keyboard activation using Enter and Space</li>
            <li>Disabled section support</li>
            <li>Screen reader support</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="stack">
      <h4>Accordion</h4>

      <Accordion items={items} />
    </div>
  );
}
