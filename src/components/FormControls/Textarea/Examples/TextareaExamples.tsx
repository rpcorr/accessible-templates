import { useState } from 'react';
import { Tabs } from '../../../ContentFeedback/Tab';
import { Textarea } from '..';

export function TextareaExamples() {
  const [message, setMessage] = useState('');

  return (
    <Tabs
      tabs={[
        {
          id: 'basic',
          label: 'Basic',
          content: (
            <div className="stack">
              <h4>Basic Textarea</h4>

              <Textarea label="Message" placeholder="Enter your message" />
            </div>
          ),
        },
        {
          id: 'rows',
          label: 'Rows',
          content: (
            <div className="stack">
              <h4>Custom Rows (6 rows high)</h4>
              <Textarea
                label="Description"
                rows={6}
                placeholder="Enter a detailed description"
              />
            </div>
          ),
        },
        {
          id: 'description',
          label: 'Description',
          content: (
            <div className="stack">
              <h4>With Description</h4>

              <Textarea
                label="Comments"
                description="Please provide any additional information."
              />
            </div>
          ),
        },
        {
          id: 'error',
          label: 'Error',
          content: (
            <div className="stack">
              <h4>With Error</h4>

              <Textarea
                label="Message"
                error="Please enter a message before continuing."
              />
            </div>
          ),
        },
        {
          id: 'states',
          label: 'States',
          content: (
            <div className="stack">
              <h4>Required</h4>

              <Textarea label="Feedback" required />

              <h4>Disabled</h4>

              <Textarea
                label="Disabled textarea"
                defaultValue="This textarea is disabled"
                disabled
              />

              <h4>Read Only</h4>

              <Textarea
                label="Information"
                defaultValue="This content cannot be edited."
                readOnly
              />
            </div>
          ),
        },
        {
          id: 'limits',
          label: 'Limits',
          content: (
            <div className="stack">
              <h4>Character Limits</h4>

              <Textarea
                label="Bio"
                minLength={10}
                maxLength={200}
                description="Enter between 10 and 200 characters."
              />
            </div>
          ),
        },
        {
          id: 'character-count',
          label: 'Character Count',
          content: (
            <div className="stack">
              <h4>Character Counter</h4>

              <Textarea
                label="Biography"
                description="Tell us a little about yourself."
                maxLength={200}
                showCharacterCount
                placeholder="Enter your biography..."
              />
            </div>
          ),
        },
        {
          id: 'controlled',
          label: 'Controlled',
          content: (
            <div className="stack">
              <h4>Controlled Textarea</h4>

              <Textarea label="Message" value={message} onChange={setMessage} />

              <p>Current value: {message || 'Nothing entered'}</p>
            </div>
          ),
        },

        {
          id: 'auto-resize',
          label: 'Auto Resize',
          content: (
            <div className="stack">
              <h4>Automatically Resizing Textarea</h4>

              <Textarea
                label="Comments"
                description="Start typing to see the textarea expand automatically."
                placeholder="Enter your comments..."
                autoResize
                rows={2}
                maxLength={500}
                showCharacterCount
              />
            </div>
          ),
        },
      ]}
    />
  );
}
