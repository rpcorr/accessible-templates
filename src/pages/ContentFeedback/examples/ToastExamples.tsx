import { useState } from 'react';

import { Tabs } from '../../../components/ContentFeedback/Tab';
import { ToastProvider } from '../../../components/ContentFeedback/Toast';
import { useToast } from '../../../hooks/useToast';

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface PositionExampleContentProps {
  position: ToastPosition;
  onPositionChange: (position: ToastPosition) => void;
}

function PositionExampleContent({
  position,
  onPositionChange,
}: PositionExampleContentProps) {
  const { toast } = useToast();

  return (
    <div className="stack">
      <section>
        <h4>Toast Position</h4>
        <p>
          Select a supported toast position. The notification will appear in the
          selected position of the viewport.
        </p>

        <div className="stack">
          <label>
            Position
            <select
              value={position}
              onChange={(event) =>
                onPositionChange(event.target.value as ToastPosition)
              }
            >
              <option value="top-left">Top Left</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() =>
              toast({
                type: 'info',
                title: `Toast position: ${position}`,
                message: 'This toast is displayed using the selected position.',
              })
            }
          >
            Show Toast
          </button>
        </div>
      </section>
    </div>
  );
}

function PositionExample() {
  const [position, setPosition] = useState<ToastPosition>('top-right');

  return (
    <ToastProvider position={position}>
      <PositionExampleContent
        position={position}
        onPositionChange={setPosition}
      />
    </ToastProvider>
  );
}

function ToastExamplesContent() {
  const { toast, dismissAll } = useToast();
  const [actionResult, setActionResult] = useState('');

  return (
    <Tabs
      tabs={[
        {
          id: 'basic',
          label: 'Basic',
          content: (
            <div className="stack">
              <section>
                <h4>Info Toast</h4>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      type: 'info',
                      title: 'Information',
                    })
                  }
                >
                  Show Info Toast
                </button>
              </section>

              <section>
                <h4>Success Toast</h4>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      type: 'success',
                      title: 'Changes saved',
                    })
                  }
                >
                  Show Success Toast
                </button>
              </section>

              <section>
                <h4>Warning Toast</h4>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      type: 'warning',
                      title: 'Session expiring soon',
                    })
                  }
                >
                  Show Warning Toast
                </button>
              </section>

              <section>
                <h4>Error Toast</h4>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      type: 'error',
                      title: 'Unable to save changes',
                    })
                  }
                >
                  Show Error Toast
                </button>
              </section>
            </div>
          ),
        },
        {
          id: 'content',
          label: 'Content',
          content: (
            <div className="stack">
              <section>
                <h4>Title Only</h4>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      type: 'success',
                      title: 'Profile updated',
                    })
                  }
                >
                  Show Title Only
                </button>
              </section>

              <section>
                <h4>Title and Message</h4>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      type: 'success',
                      title: 'Profile updated',
                      message:
                        'Your profile information has been saved successfully.',
                    })
                  }
                >
                  Show Message Toast
                </button>
              </section>

              <section>
                <h4>Action</h4>
                <button
                  type="button"
                  onClick={() => {
                    setActionResult('');

                    toast({
                      type: 'success',
                      title: 'Item deleted',
                      message: 'The item was removed from your list.',
                      action: {
                        label: 'Undo',
                        onClick: () => {
                          setActionResult('Undo action activated.');
                        },
                      },
                    });
                  }}
                >
                  Show Action Toast
                </button>

                <p aria-live="polite">
                  {actionResult || 'No toast action activated yet.'}
                </p>
              </section>
            </div>
          ),
        },
        {
          id: 'behavior',
          label: 'Behavior',
          content: (
            <div className="stack">
              <section>
                <h4>Auto Dismiss</h4>
                <p>
                  This toast uses the default duration and will automatically
                  dismiss after a short period.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      type: 'info',
                      title: 'This toast will dismiss automatically',
                    })
                  }
                >
                  Show Auto-Dismiss Toast
                </button>
              </section>

              <section>
                <h4>Persistent Toast</h4>
                <p>
                  A duration of <code>0</code> keeps the toast visible until the
                  user dismisses it.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      type: 'warning',
                      title: 'This toast stays visible',
                      message: 'Dismiss it when you are finished.',
                      duration: 0,
                    })
                  }
                >
                  Show Persistent Toast
                </button>
              </section>

              <section>
                <h4>Multiple Toasts</h4>
                <button
                  type="button"
                  onClick={() => {
                    toast({
                      type: 'info',
                      title: 'First notification',
                    });

                    toast({
                      type: 'success',
                      title: 'Second notification',
                    });

                    toast({
                      type: 'warning',
                      title: 'Third notification',
                    });
                  }}
                >
                  Show Multiple Toasts
                </button>
              </section>

              <section>
                <h4>Dismiss All</h4>
                <button type="button" onClick={dismissAll}>
                  Dismiss All Toasts
                </button>
              </section>
            </div>
          ),
        },
        {
          id: 'position',
          label: 'Position',
          content: <PositionExample />,
        },
      ]}
    />
  );
}

export function ToastExamples() {
  return <ToastExamplesContent />;
}
