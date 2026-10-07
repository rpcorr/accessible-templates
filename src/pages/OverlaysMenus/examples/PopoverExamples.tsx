import { useState } from 'react';

import { Button } from '../../../components/ButtonsActions/Button';
import { Popover } from '../../../components/OverlaysMenus/Popover';

export function PopoverExamples() {
  const [accountPopoverOpen, setAccountPopoverOpen] = useState(false);
  const [accountMessage, setAccountMessage] = useState('');

  return (
    <div className="stack">
      <h3>Examples</h3>

      <div className="stack">
        <h4>Popover Positions</h4>

        <Popover
          trigger={Button}
          triggerContent="Top"
          title="Top Popover"
          placement="top"
        >
          <p>This popover appears above the trigger.</p>
        </Popover>

        <Popover
          trigger={Button}
          triggerContent="Right"
          title="Right Popover"
          placement="right"
        >
          <p>This popover appears to the right of the trigger.</p>
        </Popover>

        <Popover
          trigger={Button}
          triggerContent="Bottom"
          title="Bottom Popover"
          placement="bottom"
        >
          <p>This popover appears below the trigger.</p>
        </Popover>

        <Popover
          trigger={Button}
          triggerContent="Left"
          title="Left Popover"
          placement="left"
        >
          <p>This popover appears to the left of the trigger.</p>
        </Popover>
      </div>

      <div className="stack">
        <h4>Interactive Content</h4>

        <Popover
          trigger={Button}
          triggerContent="Account options"
          title="Account options"
          open={accountPopoverOpen}
          onOpenChange={setAccountPopoverOpen}
        >
          <div className="stack">
            <p>Choose an account action.</p>

            <Button
              onClick={() => {
                setAccountMessage('View profile was triggered.');
                setAccountPopoverOpen(false);
              }}
            >
              View profile
            </Button>

            <Button
              onClick={() => {
                setAccountMessage('Sign out was triggered.');
                setAccountPopoverOpen(false);
              }}
            >
              Sign out
            </Button>
          </div>
        </Popover>

        {accountMessage && (
          <p role="status" aria-live="polite">
            {accountMessage}
          </p>
        )}
      </div>

      <div className="stack">
        <h4>Long Content</h4>

        <Popover
          trigger={Button}
          triggerContent="Long Popover"
          title="Additional information"
        >
          <p>
            This popover contains a longer description to test text wrapping,
            maximum width, readability, and how the popover behaves when
            additional contextual information is provided.
          </p>
        </Popover>

        <Popover
          trigger={Button}
          triggerContent="Very Long Popover"
          title="Detailed information"
        >
          <p>
            This is a deliberately long popover message that should wrap across
            multiple lines so we can verify that the popover remains readable,
            stays within its maximum width, and does not overflow or create
            unexpected horizontal scrolling.
          </p>
        </Popover>
      </div>
    </div>
  );
}
