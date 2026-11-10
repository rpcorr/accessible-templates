import { BreadcrumbItem } from './Navigations/Breadcrumbs';

interface ComponentBreadcrumbsProps {
  current: string;
}

export function ComponentBreadcrumbs({ current }: ComponentBreadcrumbsProps) {
  return (
    <>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/components">Components</BreadcrumbItem>
      <BreadcrumbItem current>{current}</BreadcrumbItem>
    </>
  );
}
