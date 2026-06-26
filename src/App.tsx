import { Button } from './components/Button';

function App() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Accessible Components</h1>

      <section>
        <h2>Button</h2>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button disabled>Disabled Button</Button>
        </div>
      </section>
    </main>
  );
}

export default App;
