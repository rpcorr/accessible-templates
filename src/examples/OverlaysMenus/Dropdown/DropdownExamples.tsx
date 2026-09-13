import { Button } from '../../../components/ButtonsActions/Button';
import { DropdownAccessible } from '../../../components/OverlaysMenus/Dropdown/DropdownAccessible';
import { DropdownItem } from '../../../components/OverlaysMenus/Dropdown/DropdownItem';
import { DropdownBasic } from '../../../components/OverlaysMenus/Dropdown/DropdownBasic';
import { DropdownSubmenu } from '../../../components/OverlaysMenus/Dropdown/DropdownSubmenu';
import { DropdownSeparator } from '../../../components/OverlaysMenus/Dropdown/DropdownSeparator';

export function DropdownExamples() {
  return (
    <div className="stack">
      <h3>Examples</h3>
      <div className="stack">
        <h4>Basic Dropdown</h4>
        <DropdownBasic trigger={<Button>Basic Menu</Button>}>
          <button>Profile</button>
          <button>Settings</button>
          <button>Logout</button>
        </DropdownBasic>
      </div>

      <div className="stack">
        <h4>Accessible Dropdown</h4>

        <DropdownAccessible trigger={<Button>Accessible Menu</Button>}>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </DropdownAccessible>
      </div>

      <div className="stack">
        <h4>Three-Level Submenus</h4>

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

      <div className="stack">
        <h4>Four-Level Submenus</h4>
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
