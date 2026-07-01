import { Button } from '../../components/Button';
import {
  DropdownAccessible,
  DropdownItem,
} from '../../components/Dropdown/DropdownAccessible';
import { DropdownBasic } from '../../components/Dropdown/DropdownBasic';

export function DropdownExamples() {
  return (
    <div className="stack">
      <h2>Dropdowns</h2>

      <div className="row">
        <DropdownBasic trigger={<Button>Open Basic Menu</Button>}>
          <button>Profile</button>
          <button>Settings</button>
          <button>Logout</button>
        </DropdownBasic>

        <DropdownAccessible trigger={<Button>Open Accessible Menu</Button>}>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </DropdownAccessible>
      </div>
    </div>
  );
}
