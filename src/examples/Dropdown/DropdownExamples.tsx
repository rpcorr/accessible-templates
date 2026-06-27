import { Dropdown, DropdownMenu } from '../../components/Dropdown';
import { Button } from '../../components/Button';

export function DropdownExamples() {
  return (
    <div className="stack">
      <h2>Dropdowns</h2>

      <Dropdown trigger={<Button>Open Menu</Button>}>
        <DropdownMenu>
          <button>Profile</button>
          <button>Settings</button>
          <button>Logout</button>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
