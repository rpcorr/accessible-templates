import { Link } from 'react-router';

import type { ComponentGroup } from '../../../data/componentData';
import styles from '../ComponentPage.module.css';

interface ComponentGroupCardProps {
  group: ComponentGroup;
}

export function ComponentGroupCard({ group }: ComponentGroupCardProps) {
  const headingId = `${group.category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}-heading`;

  return (
    <section className={styles.card} aria-labelledby={headingId}>
      <h3 id={headingId}>{group.category}</h3>

      <p>{group.description}</p>

      <ul className={styles.componentList}>
        {group.components.map((component) => (
          <li key={component.path}>
            <Link to={component.path}>{component.name}</Link>
            <span>{component.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
