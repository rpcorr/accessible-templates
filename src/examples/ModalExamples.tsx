import { useRef, useState } from 'react';
import { Button } from '../components/Button';
import { BasicModal, AccessibleModal } from '../components/Modal';

export function ModalExamples() {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [accessibleModalOpen, setaccessibleModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const largeTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="stack">
      <h2>Modals</h2>

      <article className="row">
        {/* Basic Modal */}
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

        {/* Accessible Modal */}
        <Button
          ref={triggerRef}
          variant="secondary"
          onClick={() => setaccessibleModalOpen(true)}
        >
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

        {/* Large Modal */}
        <Button ref={largeTriggerRef} onClick={() => setLargeModalOpen(true)}>
          Open Large Modal
        </Button>

        <AccessibleModal
          isOpen={largeModalOpen}
          onClose={() => setLargeModalOpen(false)}
          title="Large Modal Example"
          triggerRef={largeTriggerRef}
          size="large"
        >
          <p>
            This is a larger modal used for more complex content like forms,
            dashboards, or multi-step flows.
          </p>

          <p>
            It demonstrates how the modal adapts to wider layouts while still
            maintaining accessibility and keyboard navigation.
          </p>

          <Button>Primary Action</Button>
        </AccessibleModal>
      </article>
    </section>
  );
}
