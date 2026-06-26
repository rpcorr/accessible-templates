import { useRef, useState } from 'react';
import { Button } from '../components/Button';
import { BasicModal, AccessibleModal } from '../components/Modal';

export function ModalExamples() {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [accessibleModalOpen, setaccessibleModalOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="stack">
      <h2>Modals</h2>

      <article className="stack">
        <h3>Basic Modal</h3>

        <Button onClick={() => setBasicModalOpen(true)}>
          Open Basic Modal
        </Button>

        <BasicModal
          isOpen={basicModalOpen}
          onClose={() => setBasicModalOpen(false)}
          title="Basic Modal"
        >
          <p>A simple modal with overlay click and Escape key support.</p>
        </BasicModal>
      </article>

      <article className="stack">
        <h3>Accessible Modal</h3>

        <Button ref={triggerRef} onClick={() => setaccessibleModalOpen(true)}>
          Open Accessible Modal
        </Button>

        <AccessibleModal
          isOpen={accessibleModalOpen}
          onClose={() => setaccessibleModalOpen(false)}
          title="Accessible Modal"
          triggerRef={triggerRef}
        >
          <p>Includes keyboard navigation and focus trapping.</p>

          <Button>Focusable Button</Button>
        </AccessibleModal>
      </article>
    </section>
  );
}
