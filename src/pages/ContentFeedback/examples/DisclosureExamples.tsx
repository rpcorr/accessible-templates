import { useState } from 'react';
import { Disclosure } from '../../../components/ContentFeedback/Disclosure/Disclosure';

export function DisclosureExamples() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <div className="stack">
      <section>
        <h4>Basic Disclosure</h4>
        <Disclosure title="More information">
          <p>
            This content is hidden until the disclosure is expanded. Activate
            the button to show or hide the content.
          </p>
        </Disclosure>
      </section>

      <section>
        <h4>Initially Open</h4>
        <Disclosure title="Additional details" defaultOpen>
          <p>
            This disclosure is expanded when the page loads. Users can still
            collapse and expand the content using the button.
          </p>
        </Disclosure>
      </section>

      <section>
        <h4>Controlled Disclosure</h4>
        <p>The open state is controlled by the parent component.</p>

        <Disclosure
          title="Controlled content"
          open={controlledOpen}
          onOpenChange={setControlledOpen}
        >
          <p>The parent component controls whether this content is visible.</p>
        </Disclosure>

        <p>
          Current state: <strong>{controlledOpen ? 'Open' : 'Closed'}</strong>
        </p>
      </section>

      <section>
        <h4>Disabled Disclosure</h4>
        <Disclosure title="Unavailable content" disabled>
          <p>
            This content cannot be expanded because the disclosure is disabled.
          </p>
        </Disclosure>
      </section>

      <section>
        <h4>Rich Content</h4>
        <Disclosure title="Learn more about accessibility">
          <h5>Accessible interfaces</h5>
          <p>
            Accessible interfaces should support a wide range of users,
            including people who navigate with keyboards or assistive
            technologies.
          </p>
          <ul>
            <li>Use semantic HTML whenever possible.</li>
            <li>Provide visible focus indicators.</li>
            <li>Ensure interactive controls have accessible names.</li>
          </ul>
        </Disclosure>
      </section>

      <section>
        <h4>Multiple Disclosures</h4>
        <p>
          Multiple disclosures can be used independently within the same
          section.
        </p>

        <div className="stack">
          <Disclosure title="Account information">
            <p>Your account information can be displayed here.</p>
          </Disclosure>

          <Disclosure title="Privacy information">
            <p>Privacy information can be displayed here.</p>
          </Disclosure>

          <Disclosure title="Support information">
            <p>Support information can be displayed here.</p>
          </Disclosure>
        </div>
      </section>

      <section>
        <h4>Content with Links</h4>
        <Disclosure title="Learn more">
          <p>
            Visit the <a href="/components">Components</a> page to explore the
            accessible components in this library.
          </p>
        </Disclosure>
      </section>
    </div>
  );
}
