import type { ReactNode } from 'react';
import { Breadcrumbs } from '../Navigations/Breadcrumbs';
import { BreadcrumbItem } from '../Navigations/Breadcrumbs/BreadcrumbItem';

type PageLayoutProps = {
  title: string;
  children: ReactNode;
  showCurrentBreadcrumb?: boolean;
};

export function PageLayout({
  title,
  children,
  showCurrentBreadcrumb = true,
}: PageLayoutProps) {
  return (
    <section className="stack">
      <Breadcrumbs separator="slash">
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          {showCurrentBreadcrumb ? (
            <>
              <BreadcrumbItem href="/components">Components</BreadcrumbItem>
              <BreadcrumbItem current>{title}</BreadcrumbItem>
            </>
          ) : (
            <BreadcrumbItem current>Components</BreadcrumbItem>
          )}
        </>
      </Breadcrumbs>

      <h2>{title}</h2>
      {children}
    </section>
  );
}
