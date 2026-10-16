import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { MultiItemCarousel } from './MultiItemCarousel';

const mockItems = [
  { id: 'item-1', label: 'First', content: <p>First item</p> },
  { id: 'item-2', label: 'Second', content: <p>Second item</p> },
  { id: 'item-3', label: 'Third', content: <p>Third item</p> },
  { id: 'item-4', label: 'Fourth', content: <p>Fourth item</p> },
  { id: 'item-5', label: 'Fifth', content: <p>Fifth item</p> },
];

let viewportWidth = 1200;
let resizeCallback: ResizeObserverCallback | undefined;

class MockResizeObserver implements ResizeObserver {
  observe(target: Element) {
    resizeCallback?.(
      [
        {
          target,
          contentRect: {
            width: viewportWidth,
            height: 300,
            x: 0,
            y: 0,
            top: 0,
            right: viewportWidth,
            bottom: 300,
            left: 0,
            toJSON: () => ({}),
          },
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: [],
        } as unknown as ResizeObserverEntry,
      ],
      this,
    );
  }

  unobserve() {}

  disconnect() {}
}

type MockMediaQueryList = {
  matches: boolean;
  media: string;
  onchange: ((event: MediaQueryListEvent) => void) | null;
  addEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
  ) => void;
  removeEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
  ) => void;
  addListener: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener: (listener: (event: MediaQueryListEvent) => void) => void;
  dispatchEvent: (event: Event) => boolean;
};

const mediaQueries = new Map<
  string,
  {
    queryList: MockMediaQueryList;
    listeners: Set<(event: MediaQueryListEvent) => void>;
  }
>();

function setViewportWidth(width: number) {
  viewportWidth = width;

  const queries = ['(min-width: 40rem)', '(min-width: 64rem)'];

  queries.forEach((query) => {
    const matches =
      query === '(min-width: 64rem)' ? width >= 1024 : width >= 640;

    const existing = mediaQueries.get(query);

    if (existing) {
      if (existing.queryList.matches !== matches) {
        existing.queryList.matches = matches;

        const event = {
          matches,
          media: query,
        } as MediaQueryListEvent;

        existing.listeners.forEach((listener) => listener(event));
      }

      return;
    }

    const listeners = new Set<(event: MediaQueryListEvent) => void>();

    const queryList: MockMediaQueryList = {
      matches,
      media: query,
      onchange: null,
      addEventListener: (_type, listener) => {
        if (typeof listener === 'function') {
          listeners.add(listener as (event: MediaQueryListEvent) => void);
        }
      },
      removeEventListener: (_type, listener) => {
        if (typeof listener === 'function') {
          listeners.delete(listener as (event: MediaQueryListEvent) => void);
        }
      },
      addListener: (listener) => listeners.add(listener),
      removeListener: (listener) => listeners.delete(listener),
      dispatchEvent: () => true,
    };

    mediaQueries.set(query, { queryList, listeners });
  });

  window.matchMedia = vi.fn((query: string) => {
    const entry = mediaQueries.get(query);

    if (!entry) {
      throw new Error(`Unexpected media query: ${query}`);
    }

    return entry.queryList as unknown as MediaQueryList;
  });
}

describe('MultiItemCarousel', () => {
  beforeEach(() => {
    resizeCallback = undefined;
    mediaQueries.clear();

    vi.stubGlobal(
      'ResizeObserver',
      class extends MockResizeObserver {
        constructor(callback: ResizeObserverCallback) {
          super();
          resizeCallback = callback;
        }
      },
    );

    setViewportWidth(1200);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders the labelled carousel and its items', () => {
    render(<MultiItemCarousel items={mockItems} label="Featured resources" />);

    expect(
      screen.getByRole('region', { name: 'Featured resources' }),
    ).toBeInTheDocument();

    expect(screen.getByText('First item')).toBeInTheDocument();
    expect(screen.getByText('Fifth item')).toBeInTheDocument();
  });

  it('shows Previous and Next controls when there are more items than visible', () => {
    render(<MultiItemCarousel items={mockItems} label="Featured resources" />);

    expect(
      screen.getByRole('button', { name: 'Previous items' }),
    ).toBeDisabled();

    expect(screen.getByRole('button', { name: 'Next items' })).toBeEnabled();
  });

  it('advances one item at a time in item mode', () => {
    render(
      <MultiItemCarousel
        items={mockItems}
        label="Featured resources"
        itemsPerView={{ mobile: 1, tablet: 1, desktop: 1 }}
        scrollMode="item"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next items' }));

    const firstItem = screen.getByText('First item').closest('[role="group"]');
    const secondItem = screen
      .getByText('Second item')
      .closest('[role="group"]');

    expect(firstItem).toHaveAttribute('aria-hidden', 'true');
    expect(secondItem).toHaveAttribute('aria-hidden', 'false');
  });

  it('advances by a full page in page mode', () => {
    render(
      <MultiItemCarousel
        items={mockItems}
        label="Featured resources"
        itemsPerView={{ mobile: 2, tablet: 2, desktop: 2 }}
        scrollMode="page"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next items' }));

    expect(
      screen.getByText('First item').closest('[role="group"]'),
    ).toHaveAttribute('aria-hidden', 'true');

    expect(
      screen.getByText('Third item').closest('[role="group"]'),
    ).toHaveAttribute('aria-hidden', 'false');
  });

  it('wraps to the beginning when looping forward', () => {
    render(
      <MultiItemCarousel
        items={mockItems}
        label="Featured resources"
        itemsPerView={{ mobile: 1, tablet: 1, desktop: 1 }}
        loop
      />,
    );

    const nextButton = screen.getByRole('button', { name: 'Next items' });

    for (let index = 0; index < mockItems.length - 1; index += 1) {
      fireEvent.click(nextButton);
    }

    fireEvent.click(nextButton);

    expect(
      screen.getByText('First item').closest('[role="group"]'),
    ).toHaveAttribute('aria-hidden', 'false');
  });

  it('calls onIndexChange when controlled navigation is activated', () => {
    const onIndexChange = vi.fn();

    render(
      <MultiItemCarousel
        items={mockItems}
        label="Featured resources"
        itemsPerView={{ mobile: 1, tablet: 1, desktop: 1 }}
        activeIndex={0}
        onIndexChange={onIndexChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next items' }));

    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('hides navigation controls when all items fit in view', () => {
    render(
      <MultiItemCarousel
        items={mockItems.slice(0, 2)}
        label="Featured resources"
        itemsPerView={{ mobile: 3, tablet: 3, desktop: 3 }}
      />,
    );

    expect(
      screen.queryByRole('button', { name: 'Previous items' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: 'Next items' }),
    ).not.toBeInTheDocument();
  });

  it('renders no navigation controls for an empty collection', () => {
    render(<MultiItemCarousel items={[]} label="Empty carousel" />);

    expect(
      screen.queryByRole('button', { name: 'Previous items' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: 'Next items' }),
    ).not.toBeInTheDocument();
  });

  it('provides indicators for navigable positions', () => {
    render(
      <MultiItemCarousel
        items={mockItems}
        label="Featured resources"
        itemsPerView={{ mobile: 1, tablet: 1, desktop: 1 }}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Go to position 1 of 5' }),
    ).toHaveAttribute('aria-current', 'true');

    fireEvent.click(
      screen.getByRole('button', { name: 'Go to position 3 of 5' }),
    );

    expect(
      screen.getByText('Third item').closest('[role="group"]'),
    ).toHaveAttribute('aria-hidden', 'false');
  });

  it('returns to the previous page correctly from a partial final page', () => {
    const eightItems = Array.from({ length: 8 }, (_, index) => ({
      id: `item-${index + 1}`,
      label: `Item ${index + 1}`,
      content: <p>Item {index + 1}</p>,
    }));

    render(
      <MultiItemCarousel
        items={eightItems}
        label="Featured resources"
        itemsPerView={{ mobile: 3, tablet: 3, desktop: 3 }}
        scrollMode="page"
      />,
    );

    const nextButton = screen.getByRole('button', {
      name: 'Next items',
    });
    const previousButton = screen.getByRole('button', {
      name: 'Previous items',
    });

    // Move from the first page to the second, then to the final partial page.
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(
      screen.getByText('Item 6').closest('[role="group"]'),
    ).toHaveAttribute('aria-hidden', 'false');

    // The final page starts at index 5. Previous should return to index 3.
    fireEvent.click(previousButton);

    expect(
      screen.getByText('Item 4').closest('[role="group"]'),
    ).toHaveAttribute('aria-hidden', 'false');

    // Previous should then return to the first page.
    fireEvent.click(previousButton);

    expect(
      screen.getByText('Item 1').closest('[role="group"]'),
    ).toHaveAttribute('aria-hidden', 'false');
  });

  it('wraps to the final position when looping backward', () => {
    render(
      <MultiItemCarousel
        items={mockItems}
        label="Featured resources"
        itemsPerView={{ mobile: 1, tablet: 1, desktop: 1 }}
        loop
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous items' }));

    expect(
      screen.getByText('Fifth item').closest('[role="group"]'),
    ).toHaveAttribute('aria-hidden', 'false');
  });

  it('supports keyboard activation using the Next button', async () => {
    const user = userEvent.setup();

    render(
      <MultiItemCarousel
        items={mockItems}
        label="Featured resources"
        itemsPerView={{ mobile: 1, tablet: 1, desktop: 1 }}
      />,
    );

    const nextButton = screen.getByRole('button', {
      name: 'Next items',
    });

    nextButton.focus();
    expect(nextButton).toHaveFocus();

    await user.keyboard('{Enter}');

    expect(nextButton).toHaveFocus();

    expect(
      screen.getByText('Second item').closest('[role="group"]'),
    ).toHaveAttribute('aria-hidden', 'false');
  });

  it('updates the visible item count at responsive breakpoints', () => {
    setViewportWidth(500);

    const { container } = render(
      <MultiItemCarousel items={mockItems} label="Featured resources" />,
    );

    const carousel = screen.getByRole('region', {
      name: 'Featured resources',
    });

    expect(carousel).toHaveStyle({ '--items-visible': '1' });

    act(() => {
      setViewportWidth(800);
    });

    expect(carousel).toHaveStyle({ '--items-visible': '2' });

    act(() => {
      setViewportWidth(1200);
    });

    expect(carousel).toHaveStyle({ '--items-visible': '3' });
    expect(container.querySelectorAll('[aria-hidden="false"]')).toHaveLength(3);
  });

  it('marks inactive slides as hidden and inert', () => {
    render(
      <MultiItemCarousel
        items={mockItems}
        label="Featured resources"
        itemsPerView={{ mobile: 1, tablet: 1, desktop: 1 }}
      />,
    );

    const firstSlide = screen.getByText('First item').closest('[role="group"]');

    const secondSlide = screen
      .getByText('Second item')
      .closest('[role="group"]');

    expect(firstSlide).toHaveAttribute('aria-hidden', 'false');
    expect(firstSlide).not.toHaveAttribute('inert');

    expect(secondSlide).toHaveAttribute('aria-hidden', 'true');
    expect(secondSlide).toHaveAttribute('inert');
  });

  it('updates the live announcement when the active slide changes', () => {
    const itemsWithAnnouncements = [
      {
        id: 'item-1',
        label: 'First',
        announcement: 'Introduction to accessibility.',
        content: <p>First item</p>,
      },
      {
        id: 'item-2',
        label: 'Second',
        announcement: 'Learn about reusable components.',
        content: <p>Second item</p>,
      },
    ];

    render(
      <MultiItemCarousel
        items={itemsWithAnnouncements}
        label="Featured resources"
        itemsPerView={{ mobile: 1, tablet: 1, desktop: 1 }}
      />,
    );

    const status = screen.getByRole('status');

    expect(status).toHaveTextContent(
      'Slide 1 of 2. First. Introduction to accessibility.',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next items' }));

    expect(status).toHaveTextContent(
      'Slide 2 of 2. Second. Learn about reusable components.',
    );
  });

  it('updates the current indicator when another position is selected', () => {
    render(
      <MultiItemCarousel
        items={mockItems}
        label="Featured resources"
        itemsPerView={{ mobile: 1, tablet: 1, desktop: 1 }}
      />,
    );

    const firstIndicator = screen.getByRole('button', {
      name: 'Go to position 1 of 5',
    });

    const thirdIndicator = screen.getByRole('button', {
      name: 'Go to position 3 of 5',
    });

    expect(firstIndicator).toHaveAttribute('aria-current', 'true');
    expect(thirdIndicator).not.toHaveAttribute('aria-current', 'true');

    fireEvent.click(thirdIndicator);

    expect(firstIndicator).not.toHaveAttribute('aria-current', 'true');
    expect(thirdIndicator).toHaveAttribute('aria-current', 'true');
  });
});
