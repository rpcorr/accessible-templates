import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SearchResultsPage } from './SearchResults';

describe('SearchResultsPage', () => {
  it('renders the page with its heading', () => {
    render(<SearchResultsPage />);

    expect(
      screen.getByRole('heading', { name: 'Search and Results Page' }),
    ).toBeInTheDocument();
  });

  it('renders the introductory description', () => {
    render(<SearchResultsPage />);

    expect(
      screen.getByText(
        /An example search and results page that combines accessible search/,
      ),
    ).toBeInTheDocument();
  });

  it('renders the WCAG 2.2 Level AA accessibility target', () => {
    render(<SearchResultsPage />);

    expect(
      screen.getByText(/Designed and tested with WCAG 2\.2 Level AA/),
    ).toBeInTheDocument();
  });

  it('renders the Components section', () => {
    render(<SearchResultsPage />);

    expect(
      screen.getByRole('heading', { name: 'Components' }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Search Combobox, Pagination, Breadcrumbs and Status.'),
    ).toBeInTheDocument();
  });

  it('renders the Data sources section', () => {
    render(<SearchResultsPage />);

    expect(
      screen.getByRole('heading', { name: 'Data sources' }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Search resource titles, descriptions, categories, and keywords/,
      ),
    ).toBeInTheDocument();
  });

  it('renders the Demonstrates section and its feature list', () => {
    render(<SearchResultsPage />);

    expect(
      screen.getByRole('heading', { name: 'Demonstrates' }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Resetting pagination when the search criteria change.'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Managing focus when users navigate between result pages.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the Search and Results Example', () => {
    render(<SearchResultsPage />);

    expect(
      screen.getByRole('heading', { name: 'Search and Results Example' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: /search/i }),
    ).toBeInTheDocument();
  });
});
