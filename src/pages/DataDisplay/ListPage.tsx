import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import ListExamples from './List/examples/ListExamples';

export function ListPage() {
  return (
    <PageLayout
      title="List"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>List</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible component for presenting related items in an ordered or
        unordered list. Supports configurable list markers, custom styling, and
        standard HTML attributes.
      </p>

      <div className="stack">
        <h3>Features</h3>

        <ul>
          <li>
            Supports ordered and unordered lists through the{' '}
            <code>variant</code> prop.
          </li>
          <li>
            Accepts an array of React content through the <code>items</code>{' '}
            prop, including text, JSX, and rich content.
          </li>
          <li>
            Supports default, none, circle, and decimal marker styles through
            the <code>listStyle</code> prop.
          </li>
          <li>
            Supports custom CSS classes through <code>className</code>.
          </li>
          <li>
            Accepts standard HTML attributes, including IDs and ARIA attributes.
          </li>
          <li>
            Can display custom SVG icons within list items, including
            checkmarks, warning symbols, and process arrows.
          </li>
        </ul>

        <h3>Accessibility</h3>

        <ul>
          <li>
            Uses semantic <code>ul</code> and <code>ol</code> elements to
            communicate list structure to assistive technologies.
          </li>
          <li>
            Preserves native list semantics rather than recreating lists with
            generic elements.
          </li>
          <li>Maintains the natural reading order of list items.</li>
          <li>
            Supports accessible naming and other ARIA attributes when
            appropriate.
          </li>
          <li>
            Uses native list markers by default, with CSS options for
            alternative presentation.
          </li>
          <li>
            Decorative SVG icons should be hidden from assistive technologies
            when adjacent text already communicates the item's meaning.
          </li>
        </ul>

        <h3>Usage Guidelines</h3>

        <p>
          Use an unordered list when the sequence of items does not matter, and
          an ordered list when the sequence or ranking is meaningful. Choose
          list marker styles that suit the content without relying on visual
          styling alone to communicate meaning.
        </p>

        <p>
          Use the <code>items</code> prop to provide list content. List items
          can include rich content and decorative SVG icons. Ensure icons that
          convey information not available in the accompanying text have an
          accessible text equivalent.
        </p>

        <h3>Examples</h3>

        <p>
          Explore unordered and ordered lists, alternative marker styles, rich
          content, and custom SVG icon lists, including checkmarks for completed
          requirements, warning symbols for cautions, and arrows for sequential
          steps.
        </p>
      </div>

      <ListExamples />
    </PageLayout>
  );
}
