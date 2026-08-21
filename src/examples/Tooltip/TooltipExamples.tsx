import { Button } from '../../components/Button';
import { Tooltip } from '../../components/Tooltip';

export function TooltipExamples() {
  return (
    <div className="stack">
      <h3>Examples</h3>

      <div className="stack">
        <h4>Tooltip Positions</h4>

        <Tooltip content="Tooltip above" position="top" delay={0}>
          <Button>Top</Button>
        </Tooltip>

        <Tooltip content="Tooltip to the right" position="right">
          <Button>Right</Button>
        </Tooltip>

        <Tooltip content="Tooltip below" position="bottom">
          <Button>Bottom</Button>
        </Tooltip>

        <Tooltip content="Tooltip to the left" position="left">
          <Button>Left</Button>
        </Tooltip>
      </div>
    </div>
  );
}
