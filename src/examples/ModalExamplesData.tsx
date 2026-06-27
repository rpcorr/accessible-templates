import { Button } from '../components/Button';
import type { ModalExample } from './ModalExamplesTypes';

type CreateModalExamplesProps = {
  closeModal: () => void;
};

export function createModalExamples({
  closeModal,
}: CreateModalExamplesProps): ModalExample[] {
  return [
    {
      id: 'basic',
      title: 'Basic Modal',
      type: 'basic',
      triggerLabel: 'Open Basic Modal (not accessible)',
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
            <Button onClick={closeModal}>Cancel</Button>
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
      title: 'Create User',
      type: 'accessible',
      size: 'medium',
      triggerLabel: 'Open Form Dialog',
      content: (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Form submitted');
            closeModal();
          }}
          className="stack"
        >
          <input placeholder="Name" required />
          <input placeholder="Email" required />

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={closeModal}>Cancel</Button>
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

          <Button onClick={closeModal}>Close</Button>
        </div>
      ),
    },

    {
      id: 'blocking',
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
