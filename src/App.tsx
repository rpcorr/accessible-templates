import { useState } from 'react';
import { Button } from './components/Button';
import { Modal } from './components/Modal/Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

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

      {/* ======================
          MODAL SECTION
      ====================== */}
      <section className="stack">
        <h2>Modal</h2>

        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Example Modal"
        >
          <p>This is Modal v1</p>
        </Modal>
      </section>
    </main>
  );
}

export default App;
