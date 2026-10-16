import { useState } from 'react';
import type { CSSProperties } from 'react';

import {
  MultiItemCarousel,
  type MultiItemCarouselItem,
} from '../../../components/Navigations/MultiItemCarousel';
import { Tabs } from '../../../components/ContentFeedback/Tab';

const resourceItems: MultiItemCarouselItem[] = [
  {
    id: 'accessibility',
    label: 'Web accessibility',
    announcement:
      'Build inclusive digital experiences with semantic HTML, keyboard support, and accessible interaction patterns.',
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
    id: 'components',
    label: 'Reusable components',
    announcement:
      'Create consistent interface components that can be reused across websites and applications.',
    content: (
      <div className="stack">
        <h4>Reusable Components</h4>
        <p>
          Create consistent interface components that can be reused across
          websites and applications.
        </p>
      </div>
    ),
  },
  {
    id: 'testing',
    label: 'Accessibility testing',
    announcement:
      'Combine automated checks with keyboard and screen-reader testing to identify barriers.',
    content: (
      <div className="stack">
        <h4>Accessibility Testing</h4>
        <p>
          Combine automated checks with keyboard and screen-reader testing to
          identify barriers.
        </p>
      </div>
    ),
  },
  {
    id: 'responsive',
    label: 'Responsive design',
    announcement:
      'Design layouts that adapt to different viewport sizes without sacrificing usability or readability.',
    content: (
      <div className="stack">
        <h4>Responsive Design</h4>
        <p>
          Design layouts that adapt to different viewport sizes without
          sacrificing usability or readability.
        </p>
      </div>
    ),
  },
  {
    id: 'development',
    label: 'Front-end development',
    announcement:
      'Use HTML, CSS, and JavaScript to build maintainable, interactive web experiences.',
    content: (
      <div className="stack">
        <h4>Front-End Development</h4>
        <p>
          Use HTML, CSS, and JavaScript to build maintainable, interactive web
          experiences.
        </p>
      </div>
    ),
  },
];

const imageItems: MultiItemCarouselItem[] = [
  {
    id: 'mountains',
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
  {
    id: 'desert',
    label: 'Desert',
    content: (
      <figure className="image-slide">
        <img
          src="https://placehold.co/800x450/fef3c7/92400e?text=Desert"
          alt="Placeholder image representing a desert"
          width={800}
          height={450}
        />
        <figcaption>Desert</figcaption>
      </figure>
    ),
  },
];

const cardStyles: CSSProperties = {
  boxSizing: 'border-box',
  minHeight: '22rem',
  height: '100%',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
  border: '1px solid var(--color-border, #d1d5db)',
  borderRadius: '0.75rem',
  background: 'var(--color-surface, #ffffff)',
  color: 'var(--color-text, #1f2937)',
};

const cardCategoryStyles: CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const verticalCardItems: MultiItemCarouselItem[] = [
  {
    id: 'accessibility',
    label: 'Accessibility',
    announcement:
      'Create inclusive digital experiences that work for people with different abilities. Explore accessible design principles and practices.',
    content: (
      <article className="stack" style={cardStyles}>
        <span style={cardCategoryStyles}>INCLUSION</span>
        <h3>Accessibility</h3>
        <p>
          Create inclusive digital experiences that work for people with
          different abilities.
        </p>
        <p>Explore accessible design principles and practices.</p>
      </article>
    ),
  },
  {
    id: 'design',
    label: 'Design systems',
    announcement:
      'Build consistent interfaces with reusable components and clear design patterns. Discover reusable UI components.',
    content: (
      <article className="stack" style={cardStyles}>
        <span style={cardCategoryStyles}>DESIGN</span>
        <h3>Design Systems</h3>
        <p>
          Build consistent interfaces with reusable components and clear design
          patterns.
        </p>
        <p>Discover reusable UI components.</p>
      </article>
    ),
  },
  {
    id: 'development',
    label: 'Web Development',
    announcement:
      'Create responsive, maintainable websites with modern front-end technologies. Explore front-end development.',
    content: (
      <article className="stack" style={cardStyles}>
        <span style={cardCategoryStyles}>DEVELOPMENT</span>
        <h3>Web Development</h3>
        <p>
          Create responsive, maintainable websites with modern front-end
          technologies.
        </p>
        <p>Explore front-end development.</p>
      </article>
    ),
  },
  {
    id: 'testing',
    label: 'Testing',
    announcement:
      'Test interactions, keyboard navigation, and assistive technology support. Improve the quality of every component.',
    content: (
      <article className="stack" style={cardStyles}>
        <span style={cardCategoryStyles}>QUALITY</span>
        <h3>Testing</h3>
        <p>
          Test interactions, keyboard navigation, and assistive technology
          support.
        </p>
        <p>Improve the quality of every component.</p>
      </article>
    ),
  },
  {
    id: 'resources',
    label: 'Resources',
    announcement:
      'Find practical guidance and examples for building better digital experiences. Keep learning and improving.',
    content: (
      <article className="stack" style={cardStyles}>
        <span style={cardCategoryStyles}>LEARNING</span>
        <h3>Resources</h3>
        <p>
          Find practical guidance and examples for building better digital
          experiences.
        </p>
        <p>Keep learning and improving.</p>
      </article>
    ),
  },
];

function ControlledCarouselExample() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [changeMessage, setChangeMessage] = useState('');

  return (
    <div className="stack">
      <p>
        The parent component manages the current starting position using{' '}
        <code>activeIndex</code> and receives changes through{' '}
        <code>onIndexChange</code>.
      </p>

      <p>
        Current starting index: <strong>{activeIndex}</strong>
      </p>

      <MultiItemCarousel
        items={resourceItems}
        label="Controlled accessibility resources"
        activeIndex={activeIndex}
        onIndexChange={(index) => {
          setActiveIndex(index);
          setChangeMessage(`Carousel position changed to ${index}.`);
        }}
      />

      {changeMessage && (
        <p role="status" aria-live="polite">
          {changeMessage}
        </p>
      )}

      <button
        type="button"
        onClick={() => {
          setActiveIndex(0);
          setChangeMessage('Carousel returned to its initial position.');
        }}
      >
        Reset carousel
      </button>
    </div>
  );
}

export function MultiItemCarouselExamples() {
  return (
    <div className="stack">
      <h3>Examples</h3>

      <p>
        Explore examples of displaying different content types and configuring
        carousel navigation.
      </p>

      <Tabs
        tabs={[
          {
            id: 'basic',
            label: 'Basic',
            content: (
              <div className="stack">
                <h4>Basic Multi-Item Carousel</h4>
                <p>
                  Displays multiple items at once. Use Previous and Next to move
                  through the collection.
                </p>

                <MultiItemCarousel
                  items={resourceItems}
                  label="Featured accessibility resources"
                />

                <h4>Initial Position</h4>
                <p>
                  Use <code>initialIndex</code> to set the initial starting
                  position for an uncontrolled carousel.
                </p>

                <MultiItemCarousel
                  items={resourceItems}
                  label="Resources starting at the second item"
                  initialIndex={1}
                />

                <h4>Small Collection</h4>
                <p>
                  When the collection fits in the visible area, navigation
                  controls and indicators are omitted.
                </p>

                <MultiItemCarousel
                  items={resourceItems.slice(0, 2)}
                  label="Two featured resources"
                  itemsPerView={{
                    mobile: 1,
                    tablet: 2,
                    desktop: 3,
                  }}
                />
              </div>
            ),
          },
          {
            id: 'content',
            label: 'Content',
            content: (
              <div className="stack">
                <h4>Image Carousel</h4>
                <p>
                  Display images with descriptive alternative text and captions.
                  Multiple images can be visible at the same time, depending on
                  the viewport size and configured number of items.
                </p>

                <MultiItemCarousel
                  items={imageItems}
                  label="Featured landscape images"
                  itemsPerView={{
                    mobile: 1,
                    tablet: 2,
                    desktop: 3,
                  }}
                  showSideArrows
                  showControls={false}
                />

                <h4>CoverFlow Carousel</h4>
                <p>
                  The active slide appears centered and larger, while
                  neighboring slides are scaled down and angled to create a
                  three-dimensional effect. Navigate through the images to
                  explore the circular arrangement.
                </p>

                <MultiItemCarousel
                  items={imageItems}
                  label="CoverFlow landscape images"
                  variant="coverflow"
                  loop
                  showSideArrows
                  showControls={false}
                />

                <h4>Card-Based CoverFlow Carousel</h4>
                <p>
                  Explore vertical cards arranged in a CoverFlow layout. The
                  active card appears centered and larger, while the neighboring
                  cards are smaller and angled. Use the arrows or slide
                  indicators to navigate.
                </p>

                <MultiItemCarousel
                  items={verticalCardItems}
                  label="Card-based CoverFlow"
                  variant="coverflow"
                  loop
                  showSideArrows
                  showControls={false}
                />

                <h4>Reduced Motion</h4>

                <p>
                  This carousel respects the reduced-motion preference
                  configured in your operating system or browser. When reduced
                  motion is enabled, nonessential transition animations are
                  removed while carousel navigation remains available.
                </p>

                <p>
                  Go to Settings → Accessibility → Visual effects → Animation
                  effects, and turn animation effects off
                </p>

                <MultiItemCarousel
                  items={resourceItems}
                  label="Reduced motion example"
                  itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
                />
              </div>
            ),
          },
          {
            id: 'navigation',
            label: 'Navigation',
            content: (
              <div className="stack">
                <h4>Item-by-Item Scrolling</h4>
                <p>
                  Move the starting position by one item each time you activate
                  Previous or Next.
                </p>

                <MultiItemCarousel
                  items={resourceItems}
                  label="Resources with item-by-item scrolling"
                  scrollMode="item"
                />

                <h4>Page-by-Page Scrolling</h4>
                <p>
                  Move through the collection in pages. The final position
                  remains reachable even when the number of items does not
                  divide evenly into the page size.
                </p>

                <MultiItemCarousel
                  items={resourceItems}
                  label="Resources with page-by-page scrolling"
                  scrollMode="page"
                />

                <h4>Indicators Only</h4>
                <p>
                  Hide Previous and Next while retaining direct selection of
                  available positions.
                </p>

                <MultiItemCarousel
                  items={resourceItems}
                  label="Resources with position indicators only"
                  showControls={false}
                />

                <h4>Controls Only</h4>
                <p>
                  Hide position indicators and navigate using Previous and Next.
                </p>

                <MultiItemCarousel
                  items={resourceItems}
                  label="Resources with Previous and Next controls only"
                  showIndicators={false}
                />
              </div>
            ),
          },
          {
            id: 'configuration',
            label: 'Configuration',
            content: (
              <div className="stack">
                <h4>Looping Navigation</h4>
                <p>
                  Enable <code>loop</code> to wrap from the last available
                  position to the beginning, and from the beginning to the final
                  position.
                </p>

                <MultiItemCarousel
                  items={resourceItems}
                  label="Looping accessibility resources"
                  loop
                />

                <h4>Controlled Carousel</h4>
                <p>
                  Manage the carousel position in the parent component. The
                  reset button demonstrates updating the controlled position
                  externally.
                </p>

                <ControlledCarouselExample />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
