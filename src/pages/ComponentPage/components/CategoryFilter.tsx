import {
  categories,
  type ComponentCategory,
} from '../../../data/componentData';
import { useHorizontalOverflow } from '../../../hooks/useHorizontalOverflow';
import styles from '../ComponentPage.module.css';

interface CategoryFilterProps {
  selectedCategories: ComponentCategory[];
  onToggleCategory: (category: ComponentCategory) => void;
  onUpdateCategories: (categories: ComponentCategory[]) => void;
}

export function CategoryFilter({
  selectedCategories,
  onToggleCategory,
  onUpdateCategories,
}: CategoryFilterProps) {
  const { containerRef, showRightFade } = useHorizontalOverflow();

  return (
    <div className="stack">
      <h2 id="category-filter-heading">Filter by category</h2>

      <div
        className={`${styles.filterListContainer} ${
          showRightFade ? styles.showRightFade : ''
        }`}
      >
        <div
          className={styles.filters}
          ref={containerRef}
          role="group"
          aria-labelledby="category-filter-heading"
        >
          <button
            type="button"
            aria-pressed={selectedCategories.length === 0}
            onClick={() => onUpdateCategories([])}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={selectedCategories.includes(category)}
              onClick={() => onToggleCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
