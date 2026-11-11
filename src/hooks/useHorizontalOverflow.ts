import { useEffect, useRef, useState } from 'react';

export function useHorizontalOverflow() {
  const [showRightFade, setShowRightFade] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    function updateRightIndicator() {
      const currentContainer = containerRef.current;

      if (!currentContainer) {
        return;
      }

      const hasOverflow =
        currentContainer.scrollWidth > currentContainer.clientWidth + 1;

      const hasMoreContent =
        currentContainer.scrollLeft + currentContainer.clientWidth <
        currentContainer.scrollWidth - 1;

      setShowRightFade(hasOverflow && hasMoreContent);
    }

    container.addEventListener('scroll', updateRightIndicator, {
      passive: true,
    });

    window.addEventListener('resize', updateRightIndicator);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateRightIndicator)
        : null;

    resizeObserver?.observe(container);

    Array.from(container.children).forEach((child) => {
      resizeObserver?.observe(child);
    });

    updateRightIndicator();

    return () => {
      container.removeEventListener('scroll', updateRightIndicator);
      window.removeEventListener('resize', updateRightIndicator);
      resizeObserver?.disconnect();
    };
  }, []);

  return {
    containerRef,
    showRightFade,
  };
}
