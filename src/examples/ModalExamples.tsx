import { useRef, useState } from 'react';
import { Button } from '../components/Button';
import { BasicModal, AccessibleModal } from '../components/Modal';

type ModalExample = {
  id: string;
  title: string;
  size?: 'small' | 'medium' | 'large';
  triggerLabel: string;
  type: 'basic' | 'accessible';
  content: React.ReactNode;
};

export function ModalExamples() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  // single source of truth for focus return
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const modals: ModalExample[] = [
    {
      id: 'basic',
      title: 'Basic Modal',
      type: 'basic',
      triggerLabel: 'Open Basic Modal',
      content: <p>A simple modal with overlay click and Escape key support.</p>,
    },
    {
      id: 'accessible',
      title: 'Accessible Modal',
      type: 'accessible',
      triggerLabel: 'Open Accessible Modal',
      content: (
        <>
          <p>Includes keyboard navigation and focus trapping.</p>
          <Button>Focusable Button</Button>
        </>
      ),
    },
    {
      id: 'large',
      title: 'Large Modal Example',
      type: 'accessible',
      size: 'large',
      triggerLabel: 'Open Large Modal',
      content: (
        <>
          <p>This is a larger modal used for complex layouts.</p>
          <p>It adapts to wider content areas.</p>
          <Button>Primary Action</Button>
        </>
      ),
    },
    {
      id: 'small',
      title: 'Small Modal Example',
      type: 'accessible',
      size: 'small',
      triggerLabel: 'Open Small Modal',
      content: (
        <>
          <p>Compact modal for quick decisions.</p>

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => setOpenModal(null)}>Cancel</Button>
            <Button variant="secondary">Confirm</Button>
          </div>
        </>
      ),
    },
    {
      id: 'confirm',
      title: 'Delete Item?',
      type: 'accessible',
      size: 'small',
      triggerLabel: 'Open Confirmation Dialog',
      content: (
        <>
          <p>Are you sure you want to delete this item?</p>

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => setOpenModal(null)}>Cancel</Button>
            <Button
              variant="secondary"
              onClick={() => {
                console.log('Item deleted');
                setOpenModal(null);
              }}
            >
              Confirm
            </Button>
          </div>
        </>
      ),
    },
    {
      id: 'form',
      title: 'Create User',
      type: 'accessible',
      size: 'medium',
      triggerLabel: 'Open Form Dialog',
      content: (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Form submitted');
            setOpenModal(null);
          }}
          className="stack"
        >
          <input placeholder="Name" required />
          <input placeholder="Email" required />

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button type="button" onClick={() => setOpenModal(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary">
              Save
            </Button>
          </div>
        </form>
      ),
    },
    {
      id: 'long',
      title: 'Long Content Modal',
      type: 'accessible',
      size: 'medium',
      triggerLabel: 'Open Long Content Modal',
      content: (
        <div className="stack">
          <p>Long content demo</p>

          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>Paragraph {i + 1}</p>
          ))}

          <Button onClick={() => setOpenModal(null)}>Close</Button>
        </div>
      ),
    },
  ];

  return (
    <section className="stack">
      <h2>Modals</h2>

      <article className="row">
        {modals.map((modal) => {
          const isOpen = openModal === modal.id;

          return (
            <div key={modal.id} className="row">
              <Button
                variant={modal.type === 'accessible' ? 'secondary' : 'primary'}
                onClick={(e) => {
                  activeTriggerRef.current = e.currentTarget;
                  setOpenModal(modal.id);
                }}
              >
                {modal.triggerLabel}
              </Button>

              {modal.type === 'basic' ? (
                <BasicModal
                  isOpen={isOpen}
                  onClose={() => setOpenModal(null)}
                  title={modal.title}
                >
                  {modal.content}
                </BasicModal>
              ) : (
                <AccessibleModal
                  isOpen={isOpen}
                  onClose={() => setOpenModal(null)}
                  title={modal.title}
                  triggerRef={activeTriggerRef}
                  size={modal.size}
                >
                  {modal.content}
                </AccessibleModal>
              )}
            </div>
          );
        })}
      </article>
    </section>
  );
}
