import { Link } from 'react-router';

export function HomePage() {
  return (
    <main className="stack">
      <section aria-labelledby="home-heading">
        <h2 id="home-heading">Accessible Components</h2>

        <p>
          Explore a collection of reusable, accessible UI components and
          patterns built with React, TypeScript, and modern web standards.
        </p>

        <p>
          Accessibility is treated as a core requirement, with a focus on
          semantic HTML, keyboard interaction, focus management, responsive
          behaviour, and screen reader support.
        </p>

        <p>
          <Link to="/components">Explore All Components</Link>
        </p>
      </section>

      <section aria-labelledby="categories-heading">
        <h3 id="categories-heading">Explore Component Categories</h3>

        <p>
          Browse the component library by category to find reusable, accessible
          UI components and patterns.
        </p>

        <ul>
          <li>
            <Link to="/components?category=Buttons+%26+Actions">
              Buttons &amp; Actions
            </Link>
          </li>
          <li>
            <Link to="/components?category=Content+%26+Feedback">
              Content &amp; Feedback
            </Link>
          </li>
          <li>
            <Link to="/components?category=Data+Display">Data Display</Link>
          </li>
          <li>
            <Link to="/components?category=Form+Controls">Form Controls</Link>
          </li>
          <li>
            <Link to="/components?category=Navigation">Navigation</Link>
          </li>
          <li>
            <Link to="/components?category=Overlays+%26+Menus">
              Overlays &amp; Menus
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="accessibility-heading">
        <h3 id="accessibility-heading">Accessibility First</h3>

        <p>
          Components are designed with inclusive interaction and usability in
          mind. Development and testing consider:
        </p>

        <ul>
          <li>Semantic HTML and accessible names</li>
          <li>Keyboard navigation and visible focus indicators</li>
          <li>Appropriate focus management</li>
          <li>Screen reader compatibility</li>
          <li>Responsive layouts and behaviour</li>
          <li>Accessible form controls and validation</li>
        </ul>

        <p>
          <strong>Accessibility target:</strong> Designed and tested with WCAG
          2.2 Level AA accessibility requirements in mind.
        </p>
      </section>

      <section aria-labelledby="documentation-heading">
        <h3 id="documentation-heading">Component Documentation</h3>

        <p>
          Each component includes practical examples and documentation to help
          developers understand its implementation and accessibility
          considerations.
        </p>

        <ul>
          <li>Interactive examples and usage guidance</li>
          <li>Component properties and configuration</li>
          <li>Accessibility considerations and implementation details</li>
        </ul>
      </section>

      <section aria-labelledby="technology-heading">
        <h3 id="technology-heading">Built With Modern Web Technologies</h3>

        <p>
          This project uses React, TypeScript, Vite, CSS Modules, and Vitest to
          develop, style, and test reusable UI components.
        </p>
      </section>

      <section aria-labelledby="explore-heading">
        <h3 id="explore-heading">Explore the Library</h3>

        <p>
          Browse the component collection, review the examples, and explore
          practical approaches to building more accessible web interfaces.
        </p>

        <Link to="/components">Browse the Component Library</Link>
      </section>
    </main>
  );
}
