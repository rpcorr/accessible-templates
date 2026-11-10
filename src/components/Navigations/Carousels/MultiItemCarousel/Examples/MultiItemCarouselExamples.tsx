import { useState } from 'react';

import { MultiItemCarousel } from '..';
import { Tabs } from '../../../../ContentFeedback/Tab';
import {
  imageSlides,
  multiSlides,
  verticalCardItems,
  responsiveItemsPerView,
  smallCollectionSlides,
} from '../../../../../data/carouselExampleData';

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
        items={multiSlides}
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
                  items={multiSlides}
                  label="Featured accessibility resources"
                />

                <h4>Initial Position</h4>
                <p>
                  Use <code>initialIndex</code> to set the initial starting
                  position for an uncontrolled carousel.
                </p>

                <MultiItemCarousel
                  items={multiSlides}
                  label="Resources starting at the second item"
                  initialIndex={1}
                />

                <h4>Small Collection</h4>
                <p>
                  When the collection fits in the visible area, navigation
                  controls and indicators are omitted.
                </p>

                <MultiItemCarousel
                  items={smallCollectionSlides}
                  label="Two featured resources"
                  itemsPerView={responsiveItemsPerView}
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
                  items={imageSlides}
                  label="Featured landscape images"
                  itemsPerView={responsiveItemsPerView}
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
                  items={imageSlides}
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
                  items={multiSlides}
                  label="Reduced motion example"
                  itemsPerView={responsiveItemsPerView}
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
                  items={multiSlides}
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
                  items={multiSlides}
                  label="Resources with page-by-page scrolling"
                  scrollMode="page"
                />

                <h4>Indicators Only</h4>
                <p>
                  Hide Previous and Next while retaining direct selection of
                  available positions.
                </p>

                <MultiItemCarousel
                  items={multiSlides}
                  label="Resources with position indicators only"
                  showControls={false}
                />

                <h4>Controls Only</h4>
                <p>
                  Hide position indicators and navigate using Previous and Next.
                </p>

                <MultiItemCarousel
                  items={multiSlides}
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
                  items={multiSlides}
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
