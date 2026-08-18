import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <>
      <h2>Page Not Found</h2>

      <p>Sorry, the page you are looking for does not exist.</p>

      <p>
        <Link to="/">Return to Accessible Components</Link>
      </p>
    </>
  );
}
