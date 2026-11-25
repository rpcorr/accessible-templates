export interface SearchResource {
  id: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

export const searchResources: SearchResource[] = [
  {
    id: 'web-accessibility',
    title: 'Introduction to Web Accessibility',
    description:
      'Learn the fundamentals of creating accessible websites and inclusive digital experiences.',
    category: 'Web Accessibility',
    keywords: ['WCAG', 'inclusive design', 'accessibility basics'],
  },
  {
    id: 'keyboard-navigation',
    title: 'Keyboard Navigation Best Practices',
    description:
      'Understand keyboard interaction, focus management and navigation without a mouse.',
    category: 'Keyboard Accessibility',
    keywords: ['keyboard', 'focus management', 'tab navigation'],
  },
  {
    id: 'accessible-forms',
    title: 'Creating Accessible Web Forms',
    description:
      'Learn how to build inclusive forms with accessible labels, instructions and error messages.',
    category: 'Forms',
    keywords: ['forms', 'labels', 'validation', 'error messages'],
  },
  {
    id: 'screen-readers',
    title: 'Understanding Screen Readers',
    description:
      'Explore how screen readers interpret and communicate website content to users.',
    category: 'Assistive Technology',
    keywords: ['NVDA', 'JAWS', 'VoiceOver', 'assistive technology'],
  },
  {
    id: 'wcag-guidelines',
    title: 'Understanding WCAG Guidelines',
    description:
      'Explore the Web Content Accessibility Guidelines and their four accessibility principles.',
    category: 'Web Accessibility',
    keywords: ['WCAG', 'POUR', 'compliance', 'accessibility standards'],
  },
  {
    id: 'accessible-images',
    title: 'Accessible Images and Alternative Text',
    description:
      'Learn when and how to provide meaningful alternative text for images.',
    category: 'Content Accessibility',
    keywords: ['images', 'alt text', 'alternative text'],
  },
  {
    id: 'colour-contrast',
    title: 'Colour Contrast and Readability',
    description:
      'Understand colour contrast requirements and how to make website content easier to read.',
    category: 'Visual Accessibility',
    keywords: ['colour contrast', 'readability', 'visual accessibility'],
  },
  {
    id: 'semantic-html',
    title: 'Semantic HTML for Accessibility',
    description:
      'Discover how meaningful HTML elements improve website structure and accessibility.',
    category: 'Web Development',
    keywords: ['HTML', 'landmarks', 'headings', 'semantic markup'],
  },
  {
    id: 'aria-basics',
    title: 'Introduction to ARIA',
    description:
      'Learn how ARIA roles, states and properties communicate interface information to assistive technology.',
    category: 'Web Accessibility',
    keywords: ['ARIA', 'roles', 'states', 'properties'],
  },
  {
    id: 'focus-management',
    title: 'Accessible Focus Management',
    description:
      'Learn how to manage keyboard focus in dialogs, menus and dynamic interfaces.',
    category: 'Keyboard Accessibility',
    keywords: ['focus', 'keyboard', 'dialogs', 'menus'],
  },
  {
    id: 'accessible-navigation',
    title: 'Building Accessible Website Navigation',
    description:
      'Explore techniques for creating accessible menus, breadcrumbs and navigation systems.',
    category: 'Web Development',
    keywords: ['navigation', 'menus', 'breadcrumbs', 'keyboard'],
  },
  {
    id: 'responsive-accessibility',
    title: 'Responsive Design and Accessibility',
    description:
      'Learn how responsive layouts support accessible experiences across different screen sizes.',
    category: 'Inclusive Design',
    keywords: ['responsive design', 'mobile accessibility', 'layouts'],
  },
  {
    id: 'accessible-tables',
    title: 'Creating Accessible Data Tables',
    description:
      'Understand table captions, headers and relationships that make tabular data accessible.',
    category: 'Web Development',
    keywords: ['tables', 'data', 'headers', 'captions'],
  },
  {
    id: 'accessible-media',
    title: 'Accessible Video and Audio Content',
    description:
      'Learn about captions, transcripts and audio descriptions for multimedia content.',
    category: 'Content Accessibility',
    keywords: ['video', 'audio', 'captions', 'transcripts'],
  },
  {
    id: 'accessibility-testing',
    title: 'Introduction to Accessibility Testing',
    description:
      'Explore automated and manual techniques for evaluating website accessibility.',
    category: 'Testing',
    keywords: ['testing', 'axe', 'WAVE', 'Lighthouse', 'manual testing'],
  },
  {
    id: 'inclusive-design',
    title: 'Principles of Inclusive Design',
    description:
      'Discover design approaches that consider different abilities and user experiences.',
    category: 'Inclusive Design',
    keywords: ['inclusive design', 'usability', 'universal design'],
  },
  {
    id: 'accessible-react',
    title: 'Building Accessible React Components',
    description:
      'Explore practical techniques for creating accessible and reusable React components.',
    category: 'Web Development',
    keywords: ['React', 'JavaScript', 'components', 'ARIA'],
  },
  {
    id: 'accessibility-checklist',
    title: 'Website Accessibility Checklist',
    description:
      'Use a practical checklist to review common accessibility requirements across a website.',
    category: 'Web Accessibility',
    keywords: ['checklist', 'WCAG', 'testing', 'accessibility review'],
  },
];
