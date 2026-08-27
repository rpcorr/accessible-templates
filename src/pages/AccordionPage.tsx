import { PageLayout } from '../components/PageLayout/PageLayout';
import { AccordionExamples } from '../examples';

export function AccordionPage() {
  return (
    <PageLayout title="Accordion">
      <p>
        An accessible accordion component supporting expandable content,
        multiple open sections, disabled items, keyboard interaction, and screen
        reader support.
      </p>

      <h3>Examples</h3>

      <AccordionExamples />
    </PageLayout>
  );
}
