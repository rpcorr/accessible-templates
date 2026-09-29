import { useState } from 'react';
import { Tabs } from '../../../components/ContentFeedback/Tab';
import { Textarea } from '../../../components/FormControls/Textarea';

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
      ]}
    />
  );
}
