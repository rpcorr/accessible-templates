import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';
import styles from './Card.module.css';

describe('Card', () => {
  it('renders its children', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>,
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders as an article', () => {
    render(<Card>Card content</Card>);

    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('renders an optional header', () => {
    render(<Card header={<span>Card header</span>}>Card content</Card>);

    expect(screen.getByText('Card header')).toBeInTheDocument();
  });

  it('renders an optional footer', () => {
    render(<Card footer={<span>Card footer</span>}>Card content</Card>);

    expect(screen.getByText('Card footer')).toBeInTheDocument();
  });

  it('renders without a header or footer when omitted', () => {
    const { container } = render(<Card>Card content</Card>);

    expect(container.querySelector('article')).toBeInTheDocument();
    expect(container.querySelector('article')?.children).toHaveLength(1);
  });

  it('uses the default variant when none is provided', () => {
    const { container } = render(<Card>Card content</Card>);

    expect(container.firstElementChild).toHaveClass(styles.default);
  });

  it('supports the elevated variant', () => {
    const { container } = render(<Card variant="elevated">Card content</Card>);

    expect(container.firstElementChild).toHaveClass(styles.elevated);
  });

  it('forwards HTML attributes to the article', () => {
    render(
      <Card id="account-summary" aria-label="Account summary">
        Account details
      </Card>,
    );

    expect(
      screen.getByRole('article', { name: 'Account summary' }),
    ).toHaveAttribute('id', 'account-summary');
  });

  it('preserves a custom class name', () => {
    const { container } = render(
      <Card className="custom-card">Card content</Card>,
    );

    expect(container.firstElementChild).toHaveClass('custom-card');
  });
});
