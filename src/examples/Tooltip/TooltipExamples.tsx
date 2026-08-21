import { Button } from '../../components/Button';
import { Tooltip } from '../../components/Tooltip';

export function TooltipExamples() {
  return (
    <div className="stack">
      <h3>Examples</h3>

      <div className="stack">
        <h4>Basic Tooltip</h4>

        <Tooltip content="Save your changes">
          <Button>Save</Button>
        </Tooltip>
      </div>
    </div>
  );
}
