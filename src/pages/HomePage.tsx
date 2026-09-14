import { Link } from 'react-router';

export function HomePage() {
  return (
    <main>
      <h2>Accessible Components</h2>

      <p>
        Explore a collection of reusable, accessible UI components and patterns
        built with React, TypeScript, and modern web standards.
      </p>

      <p>
        Accessibility is treated as a core requirement, with a focus on semantic
        HTML, keyboard interaction, focus management, responsive behaviour, and
        screen reader support.
      </p>

      <Link to="/components">Explore Components</Link>
    </main>
  );
}
