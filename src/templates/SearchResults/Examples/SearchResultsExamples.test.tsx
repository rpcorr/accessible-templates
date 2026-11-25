import { fireEvent, render, screen, act, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SearchResultsExamples } from './SearchResultsExamples';

describe('SearchResultsExamples', () => {
  const getResultsStatus = () => screen.getAllByRole('status')[1];

  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const renderComponent = () => {
    render(<SearchResultsExamples />);
  };

  const searchResources = (term: string) => {
    fireEvent.change(
      screen.getByRole('combobox', { name: 'Search resources' }),
      {
        target: { value: term },
      },
    );
  };

  const advanceAnnouncementTimer = () => {
    act(() => {
      vi.advanceTimersByTime(500);
    });
  };

  it('renders the search heading and description', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: 'Search Resources' }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Explore our library of accessibility resources and web development guides/,
      ),
    ).toBeInTheDocument();
  });

  it('renders the breadcrumbs', () => {
    renderComponent();

    const breadcrumb = screen.getByRole('navigation', {
      name: 'Search results breadcrumb',
    });

    expect(
      within(breadcrumb).getByRole('link', { name: 'Home' }),
    ).toHaveAttribute('href', '/');

    expect(
      within(breadcrumb).getByRole('link', { name: 'Resources' }),
    ).toHaveAttribute('href', '/resources');

    expect(within(breadcrumb).getByText('Search Results')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('renders the search combobox with its description', () => {
    renderComponent();

    expect(
      screen.getByRole('combobox', { name: 'Search resources' }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Search by resource title, description, category or keyword.',
      ),
    ).toBeInTheDocument();
  });

  it('displays the first five resources initially', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: 'Search Results' }),
    ).toBeInTheDocument();

    expect(screen.getByText('18 results')).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Introduction to Web Accessibility' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Understanding Screen Readers' }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', {
        name: 'Accessible Images and Alternative Text',
      }),
    ).not.toBeInTheDocument();
  });

  it('renders pagination with page one selected', () => {
    renderComponent();

    const pagination = screen.getByRole('navigation', {
      name: 'Search results pages',
    });

    expect(
      within(pagination).getByRole('button', {
        name: 'Page 1, current page',
      }),
    ).toHaveAttribute('aria-current', 'page');

    expect(
      within(pagination).getByRole('button', {
        name: 'Go to next page',
      }),
    ).toBeEnabled();

    expect(
      within(pagination).getByRole('button', {
        name: 'Go to previous page',
      }),
    ).toBeDisabled();
  });

  it('filters resources by title', () => {
    renderComponent();

    searchResources('Introduction to ARIA');

    expect(
      screen.getByRole('link', { name: 'Introduction to ARIA' }),
    ).toBeInTheDocument();

    expect(screen.getByText('1 result')).toBeInTheDocument();
  });

  it('filters resources by description', () => {
    renderComponent();

    searchResources('multimedia');

    expect(
      screen.getByRole('link', {
        name: 'Accessible Video and Audio Content',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('1 result')).toBeInTheDocument();
  });

  it('filters resources by category', () => {
    renderComponent();

    searchResources('Testing');

    expect(
      screen.getByRole('link', {
        name: 'Introduction to Accessibility Testing',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: 'Website Accessibility Checklist',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('2 results')).toBeInTheDocument();
  });

  it('filters resources by keyword', () => {
    renderComponent();

    searchResources('VoiceOver');

    expect(
      screen.getByRole('link', { name: 'Understanding Screen Readers' }),
    ).toBeInTheDocument();

    expect(screen.getByText('1 result')).toBeInTheDocument();
  });

  it('matches search terms without case sensitivity', () => {
    renderComponent();

    searchResources('voiceover');

    expect(
      screen.getByRole('link', { name: 'Understanding Screen Readers' }),
    ).toBeInTheDocument();
  });

  it('trims whitespace from search terms', () => {
    renderComponent();

    searchResources('  VoiceOver  ');

    expect(
      screen.getByRole('link', { name: 'Understanding Screen Readers' }),
    ).toBeInTheDocument();
  });

  it('displays a no-results message when there are no matches', () => {
    renderComponent();

    searchResources('xyz123');

    expect(
      screen.getByRole('heading', { name: 'No resources found' }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Try a different search term or clear your search to browse all available resources/,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('0 results')).toBeInTheDocument();
  });

  it('clears the search and restores all resources', () => {
    renderComponent();

    searchResources('xyz123');

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(screen.getByText('18 results')).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Introduction to Web Accessibility' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Search resources' }),
    ).toHaveValue('');
  });

  it('moves to the next page and displays results six to ten', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));

    expect(screen.getByText('18 results')).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: 'Accessible Images and Alternative Text',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Accessible Focus Management' }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', {
        name: 'Introduction to Web Accessibility',
      }),
    ).not.toBeInTheDocument();
  });

  it('moves to the previous page', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));

    fireEvent.click(
      screen.getByRole('button', { name: 'Go to previous page' }),
    );

    expect(
      screen.getByRole('link', { name: 'Introduction to Web Accessibility' }),
    ).toBeInTheDocument();
  });

  it('resets pagination to page one when the search changes', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));

    searchResources('Web Development');

    expect(
      screen.getByRole('link', { name: 'Semantic HTML for Accessibility' }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: 'Go to page 2' }),
    ).not.toBeInTheDocument();
  });

  it('focuses the results heading after changing pages', () => {
    renderComponent();

    const resultsHeading = screen.getByRole('heading', {
      name: 'Search Results',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));

    expect(resultsHeading).toHaveFocus();
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('announces the initial result range after the delay', () => {
    renderComponent();

    const status = getResultsStatus();

    expect(status).toHaveTextContent('');

    advanceAnnouncementTimer();

    expect(status).toHaveTextContent('Showing results 1 to 5 of 18.');
  });

  it('announces the updated result range after changing pages', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));

    advanceAnnouncementTimer();

    expect(getResultsStatus()).toHaveTextContent(
      'Showing results 6 to 10 of 18.',
    );
  });

  it('announces a single matching result', () => {
    renderComponent();

    searchResources('VoiceOver');

    advanceAnnouncementTimer();

    expect(getResultsStatus()).toHaveTextContent('1 result found.');
  });

  it('announces when no matching resources are found', () => {
    renderComponent();

    searchResources('xyz123');

    advanceAnnouncementTimer();

    expect(getResultsStatus()).toHaveTextContent(
      'No matching resources found.',
    );
  });

  it('announces the total count when the results fit on one page', () => {
    renderComponent();

    searchResources('Web Development');

    advanceAnnouncementTimer();

    expect(getResultsStatus()).toHaveTextContent('4 results found.');
  });
});
