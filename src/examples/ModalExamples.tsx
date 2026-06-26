import { useRef, useState } from 'react';
import { Button } from '../components/Button';
import { BasicModal, AccessibleModal } from '../components/Modal';

export function ModalExamples() {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [accessibleModalOpen, setaccessibleModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const [smallModalOpen, setSmallModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const largeTriggerRef = useRef<HTMLButtonElement>(null);
  const smallTriggerRef = useRef<HTMLButtonElement>(null);
  const confirmTriggerRef = useRef<HTMLButtonElement>(null);
  const formTriggerRef = useRef<HTMLButtonElement>(null);

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

        {/* Small Modal */}
        <Button ref={smallTriggerRef} onClick={() => setSmallModalOpen(true)}>
          Open Small Modal
        </Button>

        <AccessibleModal
          isOpen={smallModalOpen}
          onClose={() => setSmallModalOpen(false)}
          title="Small Modal Example"
          triggerRef={smallTriggerRef}
          size="small"
        >
          <p>
            This is a compact modal designed for quick actions like
            confirmations, alerts, or simple decisions.
          </p>

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => setSmallModalOpen(false)}>Cancel</Button>
            <Button variant="secondary">Confirm</Button>
          </div>
        </AccessibleModal>

        {/* Confirmation Dialog */}
        <Button ref={confirmTriggerRef} onClick={() => setConfirmOpen(true)}>
          Open Confirmation Dialog
        </Button>

        <AccessibleModal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Delete Item?"
          triggerRef={confirmTriggerRef}
          size="small"
        >
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>

            <Button
              variant="secondary"
              onClick={() => {
                console.log('Item deleted');
                setConfirmOpen(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </AccessibleModal>

        {/* Form Dialog */}
        <Button ref={formTriggerRef} onClick={() => setFormOpen(true)}>
          Open Form Dialog
        </Button>

        <AccessibleModal
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          title="Create User"
          triggerRef={formTriggerRef}
          size="medium"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Form submitted');
              setFormOpen(false);
            }}
            className="stack"
          >
            <label>
              Name
              <input type="text" placeholder="Enter name" required />
            </label>

            <label>
              Email
              <input type="email" placeholder="Enter email" required />
            </label>

            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <Button type="button" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>

              <Button type="submit" variant="secondary">
                Save
              </Button>
            </div>
          </form>
        </AccessibleModal>
      </article>
    </section>
  );
}
