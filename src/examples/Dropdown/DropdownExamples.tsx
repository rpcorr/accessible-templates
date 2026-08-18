import { Button } from '../../components/Button';
import { DropdownAccessible } from '../../components/Dropdown/DropdownAccessible';
import { DropdownItem } from '../../components/Dropdown/DropdownItem';
import { DropdownBasic } from '../../components/Dropdown/DropdownBasic';
import { DropdownSubmenu } from '../../components/Dropdown/DropdownSubmenu';
import { DropdownSeparator } from '../../components/Dropdown/DropdownSeparator';

export function DropdownExamples() {
  return (
    <div className="stack">
      <h2>Dropdown Examples</h2>

      <div className="row">
        <DropdownBasic trigger={<Button>Basic Menu</Button>}>
          <button>Profile</button>
          <button>Settings</button>
          <button>Logout</button>
        </DropdownBasic>

        <DropdownAccessible trigger={<Button>Accessible Menu</Button>}>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </DropdownAccessible>

        <DropdownAccessible
          trigger={<Button>Accessible Menu with 3-level Submenus</Button>}
        >
          <DropdownItem>New</DropdownItem>

          <DropdownSeparator />

          <DropdownSubmenu label="Open">
            <DropdownItem>Project</DropdownItem>
            <DropdownItem disabled>Sub Project (disabled)</DropdownItem>

            <DropdownSeparator />

            <DropdownSubmenu label="Recent">
              <DropdownItem>A</DropdownItem>
              <DropdownItem disabled>B (disabled)</DropdownItem>

              <DropdownSeparator />
              <DropdownItem>C</DropdownItem>
            </DropdownSubmenu>
          </DropdownSubmenu>

          <DropdownSeparator />

          <DropdownItem disabled>Rename (disabled)</DropdownItem>

          <DropdownItem>Save</DropdownItem>
        </DropdownAccessible>
      </div>
      <div className="row">
        <DropdownAccessible
          trigger={<Button>Accessible Menu with 4-level Submenus</Button>}
        >
          <DropdownItem>New</DropdownItem>

          <DropdownSubmenu label="Open">
            <DropdownItem>Project</DropdownItem>

            <DropdownSubmenu label="Recent">
              <DropdownItem>A</DropdownItem>

              <DropdownSubmenu label="2025">
                <DropdownItem>January</DropdownItem>
                <DropdownItem>February</DropdownItem>

                <DropdownSubmenu label="March">
                  <DropdownItem>Week 1</DropdownItem>
                  <DropdownItem>Week 2</DropdownItem>
                </DropdownSubmenu>
              </DropdownSubmenu>
            </DropdownSubmenu>
          </DropdownSubmenu>
        </DropdownAccessible>
      </div>
    </div>
  );
}
