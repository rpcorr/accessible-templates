import { useEffect, useRef, useState } from 'react';

import {
  Carousel,
  type CarouselSlide,
} from '../../../components/Navigations/Carousel';
import { Tabs } from '../../../components/ContentFeedback/Tab';
import { ProgressIndicator } from '../../../components/ContentFeedback/ProgressIndicator';

const slides: CarouselSlide[] = [
  {
    id: 'accessibility',
    label: 'Accessibility',
    content: (
      <div className="stack">
        <h4>Web Accessibility</h4>
        <p>
          Build inclusive digital experiences with semantic HTML, keyboard
          support, and accessible interaction patterns.
        </p>
      </div>
    ),
  },
  {
    id: 'reusable',
    label: 'Reusable components',
    content: (
      <div className="stack">
        <h4>Reusable Components</h4>
        <p>
          Create consistent, reusable interface components that can be
          integrated into different applications and projects.
        </p>
      </div>
    ),
  },
  {
    id: 'testing',
    label: 'Testing',
    content: (
      <div className="stack">
        <h4>Testing</h4>
        <p>
          Combine automated checks with keyboard navigation and screen-reader
          testing to identify accessibility issues.
        </p>
      </div>
    ),
  },
];

const imageSlides: CarouselSlide[] = [
  {
    id: 'landscape',
    label: 'Mountain landscape',
    content: (
      <figure className="image-slide">
        <img
          src="https://placehold.co/800x450/e2e8f0/334155?text=Mountain+Landscape"
          alt="Placeholder image representing a mountain landscape"
          width={800}
          height={450}
        />
        <figcaption>Mountain landscape</figcaption>
      </figure>
    ),
  },
  {
    id: 'forest',
    label: 'Forest',
    content: (
      <figure className="image-slide">
        <img
          src="https://placehold.co/800x450/d1fae5/065f46?text=Forest"
          alt="Placeholder image representing a forest"
          width={800}
          height={450}
        />
        <figcaption>Forest</figcaption>
      </figure>
    ),
  },
  {
    id: 'ocean',
    label: 'Ocean',
    content: (
      <figure className="image-slide">
        <img
          src="https://placehold.co/800x450/dbeafe/1e40af?text=Ocean"
          alt="Placeholder image representing an ocean"
          width={800}
          height={450}
        />
        <figcaption>Ocean</figcaption>
      </figure>
    ),
  },
];

const ROTATION_INTERVAL = 5000;
const TIMER_UPDATE_INTERVAL = 100;

type TimedCarouselExampleProps = {
  isActive: boolean;
};

function TimedCarouselExample({ isActive }: TimedCarouselExampleProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const startTimeRef = useRef(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (!isActive || !isPlaying || isHovered) {
      return;
    }

    startTimeRef.current = Date.now() - elapsedRef.current;

    const timerId = window.setInterval(() => {
      const now = Date.now();
      const totalElapsed = now - startTimeRef.current;

      if (totalElapsed >= ROTATION_INTERVAL) {
        const completedIntervals = Math.floor(totalElapsed / ROTATION_INTERVAL);

        startTimeRef.current += completedIntervals * ROTATION_INTERVAL;

        setActiveIndex(
          (currentIndex) =>
            (currentIndex + completedIntervals) % imageSlides.length,
        );
      }

      const nextElapsed = now - startTimeRef.current;

      elapsedRef.current = nextElapsed;
      setElapsed(nextElapsed);
    }, TIMER_UPDATE_INTERVAL);

    return () => window.clearInterval(timerId);
  }, [isActive, isPlaying, isHovered]);

  function handleManualSlideChange(index: number) {
    setActiveIndex(index);
    elapsedRef.current = 0;
    setElapsed(0);
    setIsPlaying(false);
  }

  function togglePlayback() {
    if (!isPlaying) {
      startTimeRef.current = Date.now() - elapsedRef.current;
    }

    setIsPlaying((playing) => !playing);
  }

  const progress = Math.min((elapsed / ROTATION_INTERVAL) * 100, 100);

  const remainingSeconds = Math.max(
    0,
    Math.ceil((ROTATION_INTERVAL - elapsed) / 1000),
  );

  const timedSlides = imageSlides.map((slide) => ({
    ...slide,
    content: (
      <div className="timed-carousel-slide">
        {slide.content}

        <div aria-hidden="true">
          <ProgressIndicator
            value={progress}
            max={100}
            label=""
            variant="linear"
            colour="default"
            size="compact"
          />
        </div>
      </div>
    ),
  }));

  return (
    <div
      className="stack"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={(event) => {
        const previousTarget = event.relatedTarget as Node | null;

        if (!previousTarget || !event.currentTarget.contains(previousTarget)) {
          setIsPlaying(false);
        }
      }}
    >
      <Carousel
        slides={timedSlides}
        label="Timed landscape photographs"
        activeIndex={activeIndex}
        onSlideChange={handleManualSlideChange}
      />

      <p aria-live="off">
        {isPlaying
          ? `Next slide in ${remainingSeconds} ${
              remainingSeconds === 1 ? 'second' : 'seconds'
            }.`
          : 'Automatic rotation is paused.'}
      </p>

      <div>
        <button type="button" onClick={togglePlayback}>
          {isPlaying ? 'Pause' : 'Play'} automatic rotation
        </button>
      </div>
    </div>
  );
}

function AnnouncedCarouselExample() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState('');

  function handleSlideChange(index: number) {
    setActiveIndex(index);

    const slide = imageSlides[index];

    setAnnouncement(
      `Slide ${index + 1} of ${imageSlides.length}${
        slide.label ? `: ${slide.label}` : ''
      }`,
    );
  }

  return (
    <div className="stack">
      <Carousel
        slides={imageSlides}
        label="Landscape photographs with screen reader announcements"
        activeIndex={activeIndex}
        onSlideChange={handleSlideChange}
      />

      <p
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>
    </div>
  );
}

export function CarouselExamples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [changeMessage, setChangeMessage] = useState('');
  const [activeTabId, setActiveTabId] = useState('basic');

  return (
    <div className="stack">
      <h3>Examples</h3>

      <p>
        Explore the carousel examples by category. Each tab demonstrates
        different content, navigation options, or accessibility features.
      </p>

      <Tabs
        tabs={[
          {
            id: 'basic',
            label: 'Basic',
            content: (
              <div className="stack">
                <h4>Basic Carousel</h4>
                <p>
                  Navigate through slides using the Previous and Next buttons or
                  slide indicators.
                </p>
                <Carousel slides={slides} label="Accessibility resources" />

                <h4>Initial Slide</h4>
                <p>
                  Set <code>initialIndex</code> to choose which slide appears
                  first.
                </p>
                <Carousel
                  slides={slides}
                  label="Reusable component resources"
                  initialIndex={1}
                />

                <h4>Single Slide</h4>
                <p>
                  When only one slide is provided, the carousel displays its
                  content without navigation controls or indicators.
                </p>
                <Carousel
                  slides={[slides[0]]}
                  label="Single accessibility resource"
                />
              </div>
            ),
          },
          {
            id: 'content',
            label: 'Content & Navigation',
            content: (
              <div className="stack">
                <h4>Image Slider</h4>
                <p>
                  Display images with captions using the same reusable carousel
                  component.
                </p>
                <Carousel
                  slides={imageSlides}
                  label="Featured landscape photographs"
                />

                <h4>Indicators Only</h4>
                <p>
                  Hide the Previous and Next buttons while keeping direct slide
                  selection available.
                </p>
                <Carousel
                  slides={slides}
                  label="Resources with slide indicators"
                  showControls={false}
                />

                <h4>Controlled Carousel</h4>
                <p>
                  The parent component controls the active slide and receives
                  notification when the user changes it.
                </p>
                <Carousel
                  slides={slides}
                  label="Controlled accessibility resources"
                  activeIndex={activeIndex}
                  onSlideChange={(index) => {
                    setActiveIndex(index);
                    setChangeMessage(`Slide ${index + 1} selected.`);
                  }}
                />

                {changeMessage && (
                  <p role="status" aria-live="polite">
                    {changeMessage}
                  </p>
                )}
              </div>
            ),
          },
          {
            id: 'rotation',
            label: 'Auto-Rotation',
            content: (
              <div className="stack">
                <h4>Looping Carousel</h4>
                <p>
                  Enable <code>loop</code> to move from the last slide to the
                  first, and from the first slide to the last.
                </p>
                <Carousel
                  slides={slides}
                  label="Looping accessibility resources"
                  loop
                />

                <h4>Auto-Rotating Carousel</h4>
                <p>
                  Automatically advance through slides at a set interval. Use
                  the Pause button to stop rotation or the Play button to resume
                  it.
                </p>
                <Carousel
                  slides={imageSlides}
                  label="Auto-rotating landscape photographs"
                  autoPlay
                  isActive={activeTabId === 'rotation'}
                  interval={5000}
                />

                <h4>Timed Carousel with Progress Indicator</h4>
                <p>
                  The progress bar visually shows how much time has elapsed
                  before the next slide. Pause or resume the timer, or navigate
                  manually to stop automatic rotation.
                </p>
                <TimedCarouselExample isActive={activeTabId === 'rotation'} />
              </div>
            ),
          },
          {
            id: 'accessibility',
            label: 'Accessibility',
            content: (
              <div className="stack">
                <h4>Carousel with Screen Reader Announcements</h4>
                <p>
                  Navigate between slides to hear an announcement identifying
                  the selected slide. Each slide should also provide meaningful
                  alternative text and captions where appropriate.
                </p>
                <AnnouncedCarouselExample />
              </div>
            ),
          },
        ]}
        onTabChange={setActiveTabId}
      />
    </div>
  );
}
