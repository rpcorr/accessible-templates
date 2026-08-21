import { Button } from '../../components/Button';
import { Tooltip } from '../../components/Tooltip';

export function TooltipExamples() {
  return (
    <div className="stack">
      <h3>Examples</h3>

      <div className="stack">
        <h4>Tooltip Positions</h4>

        <Tooltip content="Tooltip above" position="top">
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

        <Tooltip content="This tooltip contains a longer description to test text wrapping, maximum width, and readability when additional information is provided.">
          <Button>Long Tooltip</Button>
        </Tooltip>

        <Tooltip content="This is a deliberately long tooltip message that should wrap across multiple lines so we can verify that the tooltip remains readable, stays within its maximum width, and does not overflow or create unexpected horizontal scrolling.">
          <Button>Very Long Tooltip</Button>
        </Tooltip>
      </div>
    </div>
  );
}
