import type { ComponentGroup } from '../../../data/componentData';
import { ComponentGroupCard } from './ComponentGroupCard';
import styles from '../ComponentPage.module.css';

interface ComponentResultsProps {
  groups: ComponentGroup[];
}

export function ComponentResults({ groups }: ComponentResultsProps) {
  if (groups.length === 0) {
    return (
      <p role="status">
        No components found. Try a different search term or category.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {groups.map((group) => (
        <ComponentGroupCard key={group.category} group={group} />
      ))}
    </div>
  );
}
