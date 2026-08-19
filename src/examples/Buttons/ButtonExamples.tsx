import { Button } from '../../components/Button';

export function ButtonExamples() {
  return (
    <section className="stack">
      <h3>Examples</h3>

      <div className="stack">
        <div className="stack">
          <h4>Primary Button</h4>
          <p>Default button style for primary actions.</p>
          <Button>Primary Button</Button>
        </div>

        <div className="stack">
          <h4>Secondary Button</h4>
          <p>Alternative button style for secondary actions.</p>
          <Button variant="secondary">Secondary Button</Button>
        </div>

        <div className="stack">
          <h4>Disabled Button</h4>
          <p>Demonstrates the disabled state.</p>
          <Button disabled>Disabled Button</Button>
        </div>
      </div>
    </section>
  );
}
