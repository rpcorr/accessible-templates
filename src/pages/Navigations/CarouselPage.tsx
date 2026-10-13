import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { CarouselExamples } from './examples/CarouselExamples';

export function CarouselPage() {
  return (
    <PageLayout
      title="Carousel"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Carousel</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible, reusable carousel for presenting content, images, and
        cards one slide at a time, with Previous and Next controls and direct
        slide selection. Optional looping and automatic rotation are also
        supported.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>
          Uses a named region with the carousel role description to identify the
          carousel to assistive technology.
        </li>
        <li>
          Identifies each slide as a group and provides its position within the
          carousel, with an optional descriptive label.
        </li>
        <li>Hides inactive slides from display and the accessibility tree.</li>
        <li>
          Provides accessible names for Previous, Next, slide indicators, and
          automatic rotation controls.
        </li>
        <li>
          Identifies the current slide indicator using <code>aria-current</code>
          .
        </li>
        <li>
          Provides visible keyboard focus indicators for enabled navigation
          controls.
        </li>
        <li>
          Disables Previous and Next at the beginning and end by default, with
          optional looping behavior.
        </li>
        <li>
          Supports a controlled active slide or internal state management.
        </li>
        <li>
          Keeps automatic rotation disabled by default and supports an optional,
          configurable rotation interval.
        </li>
        <li>
          Can pause automatic rotation while the carousel is inactive, such as
          when its containing tab is not selected.
        </li>
        <li>
          Pauses automatic rotation when the pointer hovers over the carousel.
        </li>
        <li>
          Stops automatic rotation when keyboard focus enters the carousel.
          Users can restart rotation with the Play control.
        </li>
        <li>
          Supports a single slide without displaying unnecessary navigation
          controls.
        </li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>
          Tab moves focus to enabled Previous and Next buttons, slide
          indicators, and automatic rotation controls when available.
        </li>
        <li>
          Enter or Space activates a focused navigation button, slide indicator,
          or rotation control.
        </li>
        <li>
          Disabled navigation buttons are skipped during normal keyboard
          navigation.
        </li>
        <li>
          Focus remains on the activated navigation control when the slide
          changes, provided that control remains enabled.
        </li>
        <li>
          Automatic rotation stops when keyboard focus enters the carousel.
          Users can restart it using the Play control.
        </li>
      </ul>

      <CarouselExamples />
    </PageLayout>
  );
}
