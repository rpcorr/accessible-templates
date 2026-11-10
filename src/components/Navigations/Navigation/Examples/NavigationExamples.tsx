import { Navigation } from '..';
import { navigationExampleItems } from '../../../../data/navigationExamplesData';

export function NavigationExamples() {
  return (
    <section className="stack">
      <h3>Examples</h3>
      <h4>Responsive Navigation</h4>

      <Navigation items={navigationExampleItems} />
    </section>
  );
}
