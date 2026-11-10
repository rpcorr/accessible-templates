import { MenuButton } from '..';

import {
  basicMenuItems,
  callbackMenuItems,
  disabledMenuItems,
  menuButtonCallbacks,
} from '../../../../data/menuButtonExampleData';

export function MenuButtonExamples() {
  return (
    <section aria-labelledby="menu-button-examples">
      <h3 id="menu-button-examples">Examples</h3>

      <h4>Basic Menu Button</h4>

      <MenuButton label="Actions" items={basicMenuItems} />

      <h4>Menu with Disabled Item</h4>

      <MenuButton label="File" items={disabledMenuItems} />

      <h4>Menu with Open and Close Callbacks</h4>

      <MenuButton
        label="Options"
        items={callbackMenuItems}
        {...menuButtonCallbacks}
      />
    </section>
  );
}
