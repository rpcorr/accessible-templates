import { useState } from 'react';
import { NumberInput } from '../../../components/FormControls/NumberInput';

export function NumberInputExamples() {
  const [controlledValue, setControlledValue] = useState('18');

  const [score, setScore] = useState('');

  const scoreError =
    score !== '' && (Number(score) < 0 || Number(score) > 100)
      ? 'The score must be between 0 and 100.'
      : undefined;

  return (
    <section aria-labelledby="number-input-examples-heading">
      <div>
        <h4>Basic number input</h4>
        <NumberInput label="Age" name="age" placeholder="Enter your age" />
      </div>

      <div>
        <h4>With description</h4>
        <NumberInput
          label="Quantity"
          name="quantity"
          description="Enter a quantity between 1 and 10."
          min={1}
          max={10}
        />
      </div>

      <div>
        <h4>Required input</h4>
        <NumberInput
          label="Number of guests"
          name="guests"
          required
          min={1}
          max={20}
        />
      </div>

      <div>
        <h4>With step value</h4>
        <NumberInput
          label="Price"
          name="price"
          min={0}
          step={0.01}
          placeholder="0.00"
        />
      </div>

      <div>
        <h4>Validation</h4>
        <NumberInput
          label="Score"
          name="score"
          description="Enter a score between 0 and 100."
          value={score}
          onChange={setScore}
          error={scoreError}
          min={0}
          max={100}
        />
      </div>

      <div>
        <h4>Disabled input</h4>
        <NumberInput
          label="Disabled number"
          name="disabled-number"
          value="25"
          disabled
          onChange={() => undefined}
        />
      </div>

      <div>
        <h4>Read-only input</h4>
        <NumberInput
          label="Calculated value"
          name="calculated-value"
          value="42"
          readOnly
          onChange={() => undefined}
        />
      </div>

      <div>
        <h4>Controlled input</h4>
        <NumberInput
          label="Controlled number"
          name="controlled-number"
          value={controlledValue}
          onChange={setControlledValue}
        />

        <p aria-live="polite">Current value: {controlledValue || 'empty'}</p>
      </div>
    </section>
  );
}
