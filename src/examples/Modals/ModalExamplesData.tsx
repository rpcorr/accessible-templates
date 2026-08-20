import { Button } from '../../components/Button';
import type { ModalExample } from './ModalExamplesTypes';
import { CreateUserForm } from './CreateUserForm';

type CreateModalExamplesProps = {
  closeModal: () => void;
};

export function createModalExamples({
  closeModal,
}: CreateModalExamplesProps): ModalExample[] {
  return [
    {
      id: 'basic',
      exampleLabel: 'Basic Modal',
      title: 'Basic Modal',
      type: 'basic',
      triggerLabel: 'Open Basic Modal (not accessible)',
      content: <p>A simple modal with overlay click and Escape key support.</p>,
    },
    {
      id: 'accessible',
      exampleLabel: 'Accessible Modal',
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
      exampleLabel: 'Large Modal',
      title: 'Large Modal Example',
      type: 'accessible',
      size: 'large',
      triggerLabel: 'Open Large Modal',
      variant: 'secondary',
      content: (
        <>
          <p>This is a larger modal used for complex layouts.</p>
          <p>It adapts to wider content areas.</p>
          <Button onClick={closeModal}>Primary Action</Button>
        </>
      ),
    },
    {
      id: 'small',
      exampleLabel: 'Small Modal',
      title: 'Small Modal Example',
      type: 'accessible',
      size: 'small',
      triggerLabel: 'Open Small Modal',
      content: (
        <>
          <p>Compact modal for quick decisions.</p>

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button variant="secondary" onClick={closeModal}>
              Confirm
            </Button>
          </div>
        </>
      ),
    },
    {
      id: 'confirm',
      exampleLabel: 'Confirmation Dialog',
      title: 'Delete Item?',
      type: 'accessible',
      size: 'small',
      triggerLabel: 'Open Confirmation Dialog',
      variant: 'secondary',
      content: (
        <>
          <p>Are you sure you want to delete this item?</p>

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              variant="secondary"
              onClick={() => {
                console.log('Item deleted');
                closeModal();
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
      exampleLabel: 'Form Dialog',
      title: 'Create User',
      type: 'accessible',
      size: 'medium',
      triggerLabel: 'Open Form Dialog',
      variant: 'secondary',
      content: <CreateUserForm closeModal={closeModal} />,
    },
    {
      id: 'long',
      exampleLabel: 'Long Content Modal',
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

          <Button onClick={closeModal}>Close</Button>
        </div>
      ),
    },

    {
      id: 'blocking',
      exampleLabel: 'Non-dismissible Modal',
      title: 'Important Action Required',
      type: 'accessible',
      size: 'small',
      triggerLabel: 'Open Non-dismissible Modal',
      disableClose: true,
      content: (
        <>
          <p>
            You must complete this action before continuing. This modal cannot
            be closed by clicking outside or pressing <kbd>Escape</kbd>.
          </p>

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={closeModal}>
              I Understand
            </Button>
          </div>
        </>
      ),
    },
  ];
}
