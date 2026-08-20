import { useState } from 'react';
import { Button } from '../../components/Button';

type CreateUserFormProps = {
  closeModal: () => void;
};

export function CreateUserForm({ closeModal }: CreateUserFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="stack">
      <input placeholder="Name" required />
      <input placeholder="Email" type="email" required />

      <div className="row" style={{ justifyContent: 'flex-end' }}>
        <Button type="button" onClick={closeModal}>
          Cancel
        </Button>

        <Button type="submit" variant="secondary">
          Save
        </Button>
      </div>

      {submitted && <p role="alert">User created successfully.</p>}
    </form>
  );
}
