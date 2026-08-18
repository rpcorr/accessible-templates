import { Link } from 'react-router';

export function HomePage() {
  return (
    <>
      <p>Explore the accessible components and UI patterns in this project.</p>

      <h2>Components</h2>

      <ul>
        <li>
          <Link to="/button">Button</Link>
        </li>
        <li>
          <Link to="/modal">Modal Dialog</Link>
        </li>
        <li>
          <Link to="/dropdown">Dropdown</Link>
        </li>
        <li>
          <Link to="/navigation">Navigation</Link>
        </li>
      </ul>
    </>
  );
}
