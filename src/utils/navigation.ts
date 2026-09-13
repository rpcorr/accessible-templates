import type { NavigationItem } from '../components/Navigations/Navigation/Navigation.types';

export function getCurrentNavigationItems(
  items: NavigationItem[],
  pathname: string,
): NavigationItem[] {
  return items.map((item) => ({
    ...item,
    current: item.href === pathname,
    children: item.children
      ? getCurrentNavigationItems(item.children, pathname)
      : undefined,
  }));
}
