import { useEffect, useRef } from 'react';
import styles from './SkipLink.module.css';

export interface SkipLinkItem {
  label: string;
  href: string;
  position?: 'center' | 'left';
  positionBelowPrevious?: boolean;
}

export interface SkipLinksProps {
  links?: SkipLinkItem[];
  className?: string;
}

const defaultLinks: SkipLinkItem[] = [
  {
    label: 'Skip to main content',
    href: '#main-content',
    position: 'center',
  },
];

export function SkipLink({ links = defaultLinks, className }: SkipLinksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab') {
        return;
      }

      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        lastFocusedElement.current = activeElement;
      }
    }

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  if (links.length === 0) {
    return null;
  }

  const containerClassName = [styles.skipLinks, className]
    .filter(Boolean)
    .join(' ');

  function handleFocus(link: SkipLinkItem) {
    if (!link.positionBelowPrevious) {
      return;
    }

    const previousElement = lastFocusedElement.current;
    const container = containerRef.current;

    if (!previousElement || !container) {
      return;
    }

    const previousRect = previousElement.getBoundingClientRect();

    container.style.setProperty(
      '--skip-link-top',
      `${previousRect.bottom + window.scrollY + 8}px`,
    );
  }

  return (
    <div ref={containerRef} className={containerClassName}>
      <ul className={styles.list}>
        {links.map((link) => {
          const linkClassName = [
            styles.link,
            link.position === 'left' ? styles.fromLeft : styles.centered,
            link.positionBelowPrevious ? styles.belowPrevious : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li key={`${link.href}-${link.label}`}>
              <a
                className={linkClassName}
                href={link.href}
                onFocus={() => handleFocus(link)}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
