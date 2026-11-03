import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Carousel, type CarouselSlide } from './Carousel';

const slides: CarouselSlide[] = [
  {
    id: 'intro',
    label: 'Introduction',
    content: <p>Introduction content</p>,
  },
  {
    id: 'features',
    label: 'Features',
    content: <p>Features content</p>,
  },
  {
    id: 'contact',
    label: 'Contact',
    content: <p>Contact content</p>,
  },
];

afterEach(() => {
  vi.useRealTimers();
});

describe('Carousel', () => {
  it('renders a named carousel region', () => {
    render(<Carousel slides={slides} label="Featured resources" />);

    expect(
      screen.getByRole('region', { name: 'Featured resources' }),
    ).toBeInTheDocument();
  });

  it('displays only the active slide', () => {
    render(<Carousel slides={slides} label="Featured resources" />);

    expect(
      screen.getByRole('group', { name: '1 of 3: Introduction' }),
    ).toBeVisible();

    expect(
      screen.queryByRole('group', { name: '2 of 3: Features' }),
    ).not.toBeInTheDocument();
  });

  it('moves to the next slide', () => {
    render(<Carousel slides={slides} label="Featured resources" />);

    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));

    expect(
      screen.getByRole('group', { name: '2 of 3: Features' }),
    ).toBeVisible();
  });

  it('moves to the previous slide', () => {
    render(
      <Carousel slides={slides} label="Featured resources" initialIndex={1} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));

    expect(
      screen.getByRole('group', { name: '1 of 3: Introduction' }),
    ).toBeVisible();
  });

  it('disables Previous on the first slide when looping is off', () => {
    render(<Carousel slides={slides} label="Featured resources" />);

    expect(
      screen.getByRole('button', { name: 'Previous slide' }),
    ).toBeDisabled();
  });

  it('disables Next on the last slide when looping is off', () => {
    render(
      <Carousel slides={slides} label="Featured resources" initialIndex={2} />,
    );

    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
  });

  it('loops from the last slide to the first when enabled', () => {
    render(
      <Carousel
        slides={slides}
        label="Featured resources"
        initialIndex={2}
        loop
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));

    expect(
      screen.getByRole('group', { name: '1 of 3: Introduction' }),
    ).toBeVisible();
  });

  it('navigates directly using a slide indicator', () => {
    render(<Carousel slides={slides} label="Featured resources" />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Go to slide 3: Contact' }),
    );

    expect(
      screen.getByRole('group', { name: '3 of 3: Contact' }),
    ).toBeVisible();
  });

  it('calls onSlideChange when the slide changes in controlled mode', () => {
    const onSlideChange = vi.fn();

    render(
      <Carousel
        slides={slides}
        label="Featured resources"
        activeIndex={0}
        onSlideChange={onSlideChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));

    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('does not render navigation controls for a single slide', () => {
    render(<Carousel slides={[slides[0]]} label="Featured resource" />);

    expect(
      screen.queryByRole('button', { name: 'Previous slide' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: 'Next slide' }),
    ).not.toBeInTheDocument();
  });

  it('supports hiding controls and indicators independently', () => {
    render(
      <Carousel
        slides={slides}
        label="Featured resources"
        showControls={false}
        showIndicators={false}
      />,
    );

    expect(
      screen.queryByRole('button', { name: 'Next slide' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('group', { name: 'Choose a slide' }),
    ).not.toBeInTheDocument();
  });

  it('renders an empty carousel without throwing', () => {
    render(<Carousel slides={[]} label="Empty carousel" />);

    expect(
      screen.getByRole('region', { name: 'Empty carousel' }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: 'Next slide' }),
    ).not.toBeInTheDocument();
  });

  it('starts at the requested initial index', () => {
    render(
      <Carousel slides={slides} label="Featured resources" initialIndex={1} />,
    );

    expect(
      screen.getByRole('group', { name: '2 of 3: Features' }),
    ).toBeVisible();
  });

  it('calls onSlideChange when navigating in uncontrolled mode', () => {
    const onSlideChange = vi.fn();

    render(
      <Carousel
        slides={slides}
        label="Featured resources"
        onSlideChange={onSlideChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));

    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('marks the active slide indicator', () => {
    render(<Carousel slides={slides} label="Featured resources" />);

    expect(
      screen.getByRole('button', { name: 'Go to slide 1: Introduction' }),
    ).toHaveAttribute('aria-current', 'true');

    expect(
      screen.getByRole('button', { name: 'Go to slide 2: Features' }),
    ).not.toHaveAttribute('aria-current');
  });

  it('does not auto-advance by default', () => {
    vi.useFakeTimers();

    render(<Carousel slides={slides} label="Featured resources" />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(
      screen.getByRole('group', { name: '1 of 3: Introduction' }),
    ).toBeVisible();

    expect(
      screen.queryByRole('group', { name: '2 of 3: Features' }),
    ).not.toBeInTheDocument();
  });

  it('renders a Stop automatic rotation control when autoplay is enabled', () => {
    render(<Carousel slides={slides} label="Featured resources" autoPlay />);

    expect(
      screen.getByRole('button', {
        name: /stop automatic rotation/i,
      }),
    ).toBeInTheDocument();
  });

  it('automatically advances to the next slide when autoplay is enabled', () => {
    vi.useFakeTimers();

    render(
      <Carousel
        slides={slides}
        label="Featured resources"
        autoPlay
        interval={5000}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(
      screen.getByRole('group', { name: '2 of 3: Features' }),
    ).toBeVisible();
  });

  it('stops automatic rotation when the Stop control is activated', () => {
    vi.useFakeTimers();

    render(
      <Carousel
        slides={slides}
        label="Featured resources"
        autoPlay
        interval={5000}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /stop automatic rotation/i,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(
      screen.getByRole('group', { name: '1 of 3: Introduction' }),
    ).toBeVisible();

    expect(
      screen.queryByRole('group', { name: '2 of 3: Features' }),
    ).not.toBeInTheDocument();
  });
});
