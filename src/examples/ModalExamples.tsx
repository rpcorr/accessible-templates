import { useRef, useState } from 'react';
import { Button } from '../components/Button';
import { ModalV1, ModalV2 } from '../components/Modal';

export function ModalExamples() {
  const [v1Open, setV1Open] = useState(false);
  const [v2Open, setV2Open] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="stack">
      <h2>Modal</h2>

      <article className="stack">
        <h3>Version 1 – Basic Modal</h3>

        <Button onClick={() => setV1Open(true)}>Open Modal V1</Button>

        <ModalV1
          isOpen={v1Open}
          onClose={() => setV1Open(false)}
          title="Basic Modal"
        >
          <p>A simple modal with overlay click and Escape key support.</p>
        </ModalV1>
      </article>

      <article className="stack">
        <h3>Version 2 – Accessible Modal</h3>

        <Button ref={triggerRef} onClick={() => setV2Open(true)}>
          Open Modal V2
        </Button>

        <ModalV2
          isOpen={v2Open}
          onClose={() => setV2Open(false)}
          title="Accessible Modal"
          triggerRef={triggerRef}
        >
          <p>Includes keyboard navigation and focus trapping.</p>

          <Button>Focusable Button</Button>
        </ModalV2>
      </article>
    </section>
  );
}
