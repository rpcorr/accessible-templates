import { Button } from '../../components/Button';
import { DropdownAccessible } from '../../components/Dropdown/DropdownAccessible';
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
          <button role="menuitem" tabIndex={-1}>
            Profile
          </button>
          <button role="menuitem" tabIndex={-1}>
            Settings
          </button>
          <button role="menuitem" tabIndex={-1}>
            Logout
          </button>
        </DropdownAccessible>
      </div>
    </div>
  );
}
