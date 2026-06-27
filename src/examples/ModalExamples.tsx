import { useRef, useState } from 'react';
import { Button } from '../components/Button';
import { BasicModal, AccessibleModal } from '../components/Modal';
import { createModalExamples } from './ModalExamplesData';

export function ModalExamples() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  // Single source of truth for focus return
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const modals = createModalExamples({
    closeModal: () => setOpenModal(null),
  });

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
                  disableClose={modal.disableClose}
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
