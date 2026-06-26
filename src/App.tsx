import { useState } from 'react';
import { Button } from './components/Button';
import { ModalV1, ModalV2 } from './components/Modal';

function App() {
  const [v1Open, setV1Open] = useState(false);
  const [v2Open, setV2Open] = useState(false);

  return (
    <main className="container stack">
      <h1>Accessible Components</h1>

      {/* ======================
          BUTTON SECTION
      ====================== */}
      <section className="stack">
        <h2>Button</h2>

        <div className="row">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button disabled>Disabled Button</Button>
        </div>
      </section>

      {/* ================= V1 ================= */}
      <section className="stack">
        <h2>Modal V1 (Basic)</h2>

        <Button onClick={() => setV1Open(true)}>Open Modal V1</Button>

        <ModalV1
          isOpen={v1Open}
          onClose={() => setV1Open(false)}
          title="Modal V1"
        >
          <p>Basic modal without accessibility enhancements.</p>
        </ModalV1>
      </section>

      {/* ================= V2 ================= */}
      <section className="stack">
        <h2>Modal V2 (Accessible)</h2>

        <Button onClick={() => setV2Open(true)}>Open Modal V2</Button>

        <ModalV2
          isOpen={v2Open}
          onClose={() => setV2Open(false)}
          title="Modal V2"
        >
          <p>This modal includes focus trap + ARIA support.</p>

          <Button>Focusable Button</Button>
        </ModalV2>
      </section>
    </main>
  );
}

export default App;
