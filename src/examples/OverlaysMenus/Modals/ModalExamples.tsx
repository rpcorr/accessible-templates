import { useRef, useState } from 'react';
import { Button } from '../../../components/ButtonsActions/Button';
import {
  BasicModal,
  AccessibleModal,
} from '../../../components/OverlaysMenus/Modal';
import { Tabs } from '../../../components/ContentFeedback/Tab';
import { createModalExamples } from './ModalExamplesData';

export function ModalExamples() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const modals = createModalExamples({
    closeModal: () => setOpenModal(null),
  });

  const basicExamples = modals.filter(
    (modal) => modal.id === 'basic' || modal.id === 'accessible',
  );

  const sizeExamples = modals.filter(
    (modal) => modal.id === 'small' || modal.id === 'large',
  );

  const dialogExamples = modals.filter(
    (modal) => modal.id === 'confirm' || modal.id === 'blocking',
  );

  const formAndContentExamples = modals.filter(
    (modal) => modal.id === 'form' || modal.id === 'long',
  );

  const renderExamples = (examples: typeof modals) => (
    <article className="stack">
      {examples.map((modal) => {
        const isOpen = openModal === modal.id;

        return (
          <div key={modal.id} className="stack">
            <h4>{modal.exampleLabel}</h4>

            <Button
              variant={modal.variant ?? 'primary'}
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
  );

  return (
    <section className="stack">
      <h3>Examples</h3>

      <Tabs
        tabs={[
          {
            id: 'basic',
            label: 'Basic',
            content: renderExamples(basicExamples),
          },
          {
            id: 'sizes',
            label: 'Sizes',
            content: renderExamples(sizeExamples),
          },
          {
            id: 'dialogs',
            label: 'Dialogs',
            content: renderExamples(dialogExamples),
          },
          {
            id: 'forms-content',
            label: 'Forms & Content',
            content: renderExamples(formAndContentExamples),
          },
        ]}
      />
    </section>
  );
}
