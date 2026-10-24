import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import CardExamples from './Card/examples/CardExamples';

export function CardPage() {
  return (
    <PageLayout
      title="Card"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Card</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible, flexible content container for presenting related
        information. Supports optional headers and footers, default and elevated
        visual variants, and arbitrary React content.
      </p>

      <div className="stack">
        <h3>Features</h3>

        <ul>
          <li>
            Supports arbitrary React content through the <code>children</code>{' '}
            prop.
          </li>
          <li>
            Provides optional <code>header</code> and <code>footer</code>{' '}
            sections.
          </li>
          <li>
            Offers <code>default</code> and <code>elevated</code> visual
            variants.
          </li>
          <li>
            Supports custom CSS classes through <code>className</code>.
          </li>
          <li>
            Accepts standard HTML attributes, including IDs and ARIA attributes.
          </li>
          <li>
            Uses responsive padding and design tokens for consistent styling.
          </li>
        </ul>

        <h3>Accessibility</h3>

        <ul>
          <li>
            Uses a semantic <code>article</code> element for self-contained
            content.
          </li>
          <li>
            Leaves heading levels to the author so they fit the surrounding page
            hierarchy.
          </li>
          <li>
            Does not make the entire card focusable or clickable by default.
          </li>
          <li>
            Allows links, buttons, and other interactive elements within the
            card's content.
          </li>
          <li>
            Forwards ARIA attributes to support accessible naming when
            appropriate.
          </li>
          <li>
            Relies on interactive child elements to provide their own visible
            keyboard focus indicators.
          </li>
        </ul>

        <h3>Usage Guidelines</h3>

        <p>
          Use a Card to group related content, such as a profile, summary,
          resource, or information panel. Supply a heading when it helps users
          understand the content, and choose the heading level based on the
          page's heading hierarchy.
        </p>

        <p>
          Use the elevated variant when additional visual emphasis is helpful.
          Avoid placing links or buttons inside another interactive element, and
          do not rely on visual styling alone to communicate important
          information.
        </p>

        <h3>Examples</h3>

        <p>
          Explore the examples below to see the Card's basic layout, optional
          sections, visual variants, and interactive content.
        </p>
      </div>

      <CardExamples />
    </PageLayout>
  );
}
