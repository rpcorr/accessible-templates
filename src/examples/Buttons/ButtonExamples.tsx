import { Button } from '../../components/Button';

export function ButtonExamples() {
  return (
    <section className="stack">
      <h2>Buttons</h2>

      <div className="row">
        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button disabled>Disabled Button</Button>
      </div>
    </section>
  );
}
