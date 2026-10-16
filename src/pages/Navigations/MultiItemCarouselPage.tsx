import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { MultiItemCarouselExamples } from './examples/MultiItemCarouselExamples';

export function MultiItemCarouselPage() {
  return (
    <PageLayout
      title="Multi-Item Carousel"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Multi-Item Carousel</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible, reusable carousel for displaying content, images, and
        cards. Supports responsive multi-item layouts, a CoverFlow presentation,
        item-by-item or page-by-page navigation, position indicators, optional
        looping, and controlled state.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>
          Uses a named region with a carousel role description to identify the
          carousel to assistive technology.
        </li>
        <li>
          Identifies each item as a slide group and communicates its position
          within the collection, including an optional descriptive label.
        </li>
        <li>
          Hides items outside the visible range from the accessibility tree and
          prevents interaction with their content using the <code>inert</code>{' '}
          attribute.
        </li>
        <li>
          Announces the active slide's position and label through a status
          region, with optional descriptive announcement text.
        </li>
        <li>
          Provides accessible names for Previous, Next, and position indicator
          buttons.
        </li>
        <li>
          Identifies the current position indicator using{' '}
          <code>aria-current</code>.
        </li>
        <li>
          Provides visible keyboard focus indicators for navigation controls and
          indicators.
        </li>
        <li>
          Disables Previous and Next at the beginning and end by default, with
          optional looping behavior.
        </li>
        <li>
          Supports responsive item counts for mobile, tablet, and desktop
          layouts.
        </li>
        <li>
          Supports a CoverFlow presentation with a centered active slide and
          smaller, angled neighboring slides.
        </li>
        <li>
          Respects the user's reduced-motion preference by disabling
          nonessential transition animations while preserving carousel
          navigation and functionality.
        </li>
        <li>
          Supports scrolling one item at a time or moving between pages of
          items.
        </li>
        <li>
          Supports controlled navigation through <code>activeIndex</code> and{' '}
          <code>onIndexChange</code>, or internal state management.
        </li>
        <li>
          Does not automatically rotate items, so users control when the
          displayed content changes.
        </li>
        <li>
          Omits navigation controls when all items fit in the visible area.
        </li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>
          Tab and Shift+Tab move through enabled navigation buttons and position
          indicators in document order.
        </li>
        <li>
          Enter or Space activates a focused navigation button or indicator.
        </li>
        <li>
          Disabled navigation buttons cannot be activated and are not included
          in normal Tab navigation.
        </li>
        <li>
          Focus remains on the activated navigation control when the displayed
          items change and the control remains available.
        </li>
        <li>
          Content outside the visible range is excluded from keyboard
          interaction using the <code>inert</code> attribute.
        </li>
      </ul>

      <MultiItemCarouselExamples />
    </PageLayout>
  );
}
