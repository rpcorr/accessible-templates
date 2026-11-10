import { Accordion } from '..';
import { accordionItems } from '../../../../data/accordionExampleData';

export function AccordionExamples() {
  return (
    <div className="stack">
      <h4>Multiple Panel Accordion</h4>

      <Accordion items={accordionItems} />

      <h4>Single Panel Accordion</h4>

      <Accordion items={accordionItems} multiple={false} />
    </div>
  );
}
