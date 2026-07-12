import { Button } from '../../components/Button';
import { DropdownAccessible } from '../../components/Dropdown/DropdownAccessible';
import { DropdownItem } from '../../components/Dropdown/DropdownItem';
import { DropdownBasic } from '../../components/Dropdown/DropdownBasic';
import { DropdownSubmenu } from '../../components/Dropdown/DropdownSubmenu';

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

        <DropdownAccessible trigger={<Button>File</Button>}>
          <DropdownItem>New</DropdownItem>

          <DropdownSubmenu label="Open">
            <DropdownItem>Project</DropdownItem>

            <DropdownSubmenu label="Recent">
              <DropdownItem>A</DropdownItem>
              <DropdownItem>B</DropdownItem>
            </DropdownSubmenu>
          </DropdownSubmenu>

          <DropdownItem>Save</DropdownItem>
        </DropdownAccessible>
      </div>
    </div>
  );
}
