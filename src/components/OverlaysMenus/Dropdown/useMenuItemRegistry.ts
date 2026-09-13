import type { MenuItemRegistration } from './DropdownMenuContext';

export function createMenuItemRegistry() {
  const items: MenuItemRegistration[] = [];

  function registerMenuItem(item: MenuItemRegistration): () => void {
    if (!items.some((registered) => registered.ref === item.ref)) {
      items.push(item);
    }

    return () => {
      const index = items.findIndex(
        (registered) => registered.ref === item.ref,
      );

      if (index !== -1) {
        items.splice(index, 1);
      }
    };
  }

  function getMenuItems(): MenuItemRegistration[] {
    return items;
  }

  return {
    registerMenuItem,
    getMenuItems,
  };
}
