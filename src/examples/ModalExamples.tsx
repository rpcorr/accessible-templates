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
  const [longContentOpen, setLongContentOpen] = useState(false);
  const [nonDismissibleOpen, setNonDismissibleOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const largeTriggerRef = useRef<HTMLButtonElement>(null);
  const smallTriggerRef = useRef<HTMLButtonElement>(null);
  const confirmTriggerRef = useRef<HTMLButtonElement>(null);
  const formTriggerRef = useRef<HTMLButtonElement>(null);
  const longContentTriggerRef = useRef<HTMLButtonElement>(null);
  const nonDismissibleTriggerRef = useRef<HTMLButtonElement>(null);

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

        {/* Long Content Modal */}
        <Button
          ref={longContentTriggerRef}
          onClick={() => setLongContentOpen(true)}
        >
          Open Long Content Modal
        </Button>

        <AccessibleModal
          isOpen={longContentOpen}
          onClose={() => setLongContentOpen(false)}
          title="Long Content Modal"
          triggerRef={longContentTriggerRef}
          size="medium"
        >
          <div className="stack">
            <p>
              This modal demonstrates how long content behaves inside a
              constrained dialog window.
            </p>

            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. This is placeholder content to simulate a long
                scrollable modal body.
              </p>
            ))}

            <p>
              End of content. Even with long content, keyboard navigation and
              focus trapping should still work correctly.
            </p>

            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <Button onClick={() => setLongContentOpen(false)}>Close</Button>
            </div>
          </div>
        </AccessibleModal>

        {/* Non-dismissible Modal */}
        <Button
          ref={nonDismissibleTriggerRef}
          onClick={() => setNonDismissibleOpen(true)}
        >
          Open Non-dismissible Modal
        </Button>

        <AccessibleModal
          isOpen={nonDismissibleOpen}
          onClose={() => setNonDismissibleOpen(false)}
          title="Important Action Required"
          triggerRef={nonDismissibleTriggerRef}
          size="small"
          disableClose
        >
          <p>
            You must complete this action before continuing. This modal cannot
            be closed by clicking outside or pressing Escape.
          </p>

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button
              variant="secondary"
              onClick={() => setNonDismissibleOpen(false)}
            >
              I Understand
            </Button>
          </div>
        </AccessibleModal>
      </article>
    </section>
  );
}
