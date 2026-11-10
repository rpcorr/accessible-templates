import type { CSSProperties } from 'react';
import type { CarouselSlide } from '../components/Navigations/Carousels/Carousel';
import type { MultiItemCarouselItem } from '../components/Navigations/Carousels/MultiItemCarousel';

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

export const imageSlides: CarouselSlide[] = [
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

export const multiSlides: MultiItemCarouselItem[] = [
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

export const responsiveItemsPerView = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};

export const slides: CarouselSlide[] = [
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

export const smallCollectionSlides = multiSlides.slice(0, 2);

export const verticalCardItems: MultiItemCarouselItem[] = [
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
