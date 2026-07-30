export type NavigationItem = {
  id: string;
  label: string;

  href?: string;

  current?: boolean;
  disabled?: boolean;
  external?: boolean;

  children?: NavigationItem[];
};
