import { useState } from 'react';
import ColourPicker from '../../../components/FormControls/ColourPicker';

export function ColourPickerExamples() {
  const [controlledColour, setControlledColour] = useState('#2563eb');

  return (
    <div className="stack">
      <h3>Examples</h3>

      <div className="stack">
        <h4>Basic Colour Picker</h4>
        <ColourPicker label="Choose a colour" />
      </div>

      <div className="stack">
        <h4>Custom Default Colour</h4>
        <ColourPicker label="Choose a brand colour" defaultValue="#16a34a" />
      </div>

      <div className="stack">
        <h4>Colour Picker Without HEX Input</h4>
        <ColourPicker
          label="Choose a background colour"
          defaultValue="#9333ea"
          showHexInput={false}
        />
      </div>

      <div className="stack">
        <h4>Disabled Colour Picker</h4>
        <ColourPicker label="Selected colour" defaultValue="#64748b" disabled />
      </div>

      <div className="stack">
        <h4>Required Colour Picker</h4>
        <ColourPicker label="Select your preferred colour" required />
      </div>

      <div className="stack">
        <h4>Colour Picker with Instructions</h4>
        <ColourPicker
          label="Choose an accent colour"
          instructions="Select an accent colour for your application."
        />
      </div>

      <div className="stack">
        <h4>Colour Picker with Validation Error</h4>
        <ColourPicker
          label="Choose a theme colour"
          error="Please select a valid theme colour."
        />
      </div>

      <div className="stack">
        <h4>Controlled Colour Picker</h4>
        <ColourPicker
          label="Select a brand colour"
          value={controlledColour}
          onChange={setControlledColour}
        />

        <p>Selected colour: {controlledColour.toUpperCase()}</p>
      </div>
    </div>
  );
}
