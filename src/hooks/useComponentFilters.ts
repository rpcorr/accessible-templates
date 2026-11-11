import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import {
  componentGroups,
  categories,
  type ComponentCategory,
} from '../data/componentData';

export function useComponentFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = useMemo(
    () =>
      searchParams
        .getAll('category')
        .filter((category): category is ComponentCategory =>
          categories.includes(category as ComponentCategory),
        ),
    [searchParams],
  );

  const filteredGroups = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return componentGroups
      .filter(
        (group) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(group.category),
      )
      .map((group) => ({
        ...group,
        components: group.components.filter((component) => {
          const searchableText =
            `${component.name} ${component.description}`.toLowerCase();

          return searchableText.includes(normalizedQuery);
        }),
      }))
      .filter((group) => group.components.length > 0);
  }, [searchQuery, selectedCategories]);

  const resultCount = filteredGroups.reduce(
    (total, group) => total + group.components.length,
    0,
  );

  function updateCategories(nextCategories: ComponentCategory[]) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      nextParams.delete('category');

      nextCategories.forEach((category) => {
        nextParams.append('category', category);
      });

      return nextParams;
    });
  }

  function toggleCategory(category: ComponentCategory) {
    updateCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((item) => item !== category)
        : [...selectedCategories, category],
    );
  }

  function clearFilters() {
    setSearchQuery('');
    updateCategories([]);
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    filteredGroups,
    resultCount,
    updateCategories,
    toggleCategory,
    clearFilters,
  };
}
