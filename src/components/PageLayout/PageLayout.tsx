import type { ReactNode } from 'react';
import { Breadcrumbs } from '../Navigations/Breadcrumbs';

type PageLayoutProps = {
  title: string;
  breadcrumbs: ReactNode;
  children: ReactNode;
};

export function PageLayout({ title, breadcrumbs, children }: PageLayoutProps) {
  return (
    <section className="stack">
      <Breadcrumbs separator="slash">{breadcrumbs}</Breadcrumbs>

      <h2>{title}</h2>
      {children}
    </section>
  );
}
