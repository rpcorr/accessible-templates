import { Button } from './components/Button/Button';

function App() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Accessible Templates</h1>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={() => alert('Primary clicked!')}>
          Primary Button
        </Button>

        <Button variant="secondary">Secondary Button</Button>

        <Button disabled>Disabled Button</Button>
      </div>
    </main>
  );
}

export default App;
