import { SkipLink } from '../SkipLink';
import {
  footerSkipLinks,
  mainContentSkipLinks,
} from '../../../../data/skipLinkExampleData';

export function SkipLinkExamples() {
  return (
    <section>
      <h3>Examples</h3>

      <h4>Basic</h4>

      <p>
        This example provides skip links to the main content and footer. Use the
        Tab key to reveal each link, then press Enter to navigate directly to
        its destination.
      </p>

      <SkipLink
        links={mainContentSkipLinks.map(({ position, ...link }) => ({
          ...link,
          ...(position === 'center' || position === 'left' ? { position } : {}),
        }))}
      />

      <header>
        <h5>Example page header</h5>
        <p>
          This represents content that appears before the main content, such as
          a site header.
        </p>
      </header>

      <nav aria-label="Example navigation">
        <ul>
          <li>
            <a href="#example-home">Home</a>
          </li>
          <li>
            <a href="#example-about">About</a>
          </li>
          <li>
            <a href="#example-contact">Contact</a>
          </li>
        </ul>
      </nav>

      <main id="main-content" tabIndex={-1}>
        <h5 id="example-home">Main content</h5>
        <p>
          This is the main content area. Activating the skip link should take
          the user here, bypassing the header and navigation.
        </p>

        <h5 id="example-about">About</h5>
        <p>Example content for the About section.</p>

        <h5 id="example-contact">Contact</h5>
        <p>Example content for the Contact section.</p>
      </main>

      <SkipLink
        links={footerSkipLinks.map(({ position, ...link }) => ({
          ...link,
          ...(position === 'center' || position === 'left' ? { position } : {}),
        }))}
      />

      <footer id="example-footer" tabIndex={-1}>
        <h5>Example footer</h5>
        <p>
          This is the footer area. Activating the Skip to footer link should
          take the user directly here.
        </p>
      </footer>
    </section>
  );
}
