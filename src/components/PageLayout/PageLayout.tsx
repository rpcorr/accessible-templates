import type { ReactNode } from 'react';
import { PageBackLink } from '../PageBackLink';

type PageLayoutProps = {
  title: string;
  children: ReactNode;
};

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <section className="stack">
      <PageBackLink />
      <h2>{title}</h2>
      {children}
    </section>
  );
}
