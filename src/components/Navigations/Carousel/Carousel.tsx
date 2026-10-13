import React, { useEffect, useId, useState } from 'react';
import styles from './Carousel.module.css';

export type CarouselSlide = {
  id: string;
  label?: string;
  content: React.ReactNode;
};

export type CarouselProps = {
  slides: CarouselSlide[];
  label: string;
  initialIndex?: number;
  activeIndex?: number;
  onSlideChange?: (index: number) => void;
  showControls?: boolean;
  showIndicators?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  isActive?: boolean;
  interval?: number;
  className?: string;
};

function clampIndex(index: number, totalSlides: number): number {
  if (totalSlides === 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), totalSlides - 1);
}

export function Carousel({
  slides,
  label,
  initialIndex = 0,
  activeIndex,
  onSlideChange,
  showControls = true,
  showIndicators = true,
  loop = false,
  autoPlay = false,
  isActive = true,
  interval = 5000,
  className,
}: CarouselProps) {
  const carouselId = useId();

  const [internalIndex, setInternalIndex] = useState(() =>
    clampIndex(initialIndex, slides.length),
  );

  const [isRotating, setIsRotating] = useState(
    () => autoPlay && slides.length > 1,
  );

  const [isHovered, setIsHovered] = useState(false);

  const isControlled = activeIndex !== undefined;
  const totalSlides = slides.length;

  const currentIndex = clampIndex(
    isControlled ? activeIndex : internalIndex,
    totalSlides,
  );

  const hasMultipleSlides = totalSlides > 1;
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;

  const rotationInterval =
    Number.isFinite(interval) && interval > 0 ? interval : 5000;

  function goToSlide(index: number, stopRotation = true) {
    if (index < 0 || index >= totalSlides || index === currentIndex) {
      return;
    }

    if (stopRotation) {
      setIsRotating(false);
    }

    if (!isControlled) {
      setInternalIndex(index);
    }

    onSlideChange?.(index);
  }

  function goToPrevious() {
    if (isFirstSlide) {
      if (loop) {
        goToSlide(totalSlides - 1);
      }

      return;
    }

    goToSlide(currentIndex - 1);
  }

  function goToNext() {
    if (isLastSlide) {
      if (loop) {
        goToSlide(0);
      }

      return;
    }

    goToSlide(currentIndex + 1);
  }

  useEffect(() => {
    if (
      !autoPlay ||
      !isRotating ||
      isHovered ||
      !hasMultipleSlides ||
      !isActive
    ) {
      return;
    }

    const timerId = window.setInterval(() => {
      const nextIndex = currentIndex >= totalSlides - 1 ? 0 : currentIndex + 1;

      if (!isControlled) {
        setInternalIndex(nextIndex);
      }

      onSlideChange?.(nextIndex);
    }, rotationInterval);

    return () => {
      window.clearInterval(timerId);
    };
  }, [
    autoPlay,
    isRotating,
    isHovered,
    hasMultipleSlides,
    currentIndex,
    totalSlides,
    isControlled,
    onSlideChange,
    rotationInterval,
    isActive,
  ]);

  return (
    <section
      className={`${styles.carousel}${className ? ` ${className}` : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={(event) => {
        const previousTarget = event.relatedTarget as Node | null;

        if (!previousTarget || !event.currentTarget.contains(previousTarget)) {
          setIsRotating(false);
        }
      }}
    >
      <div className={styles.slides}>
        {slides.map((slide, index) => {
          const isActive = currentIndex === index;
          const slideId = `${carouselId}-slide-${index}`;

          return (
            <div
              key={slide.id}
              id={slideId}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalSlides}${
                slide.label ? `: ${slide.label}` : ''
              }`}
              hidden={!isActive}
              className={styles.slide}
            >
              {slide.content}
            </div>
          );
        })}
      </div>

      {hasMultipleSlides && (
        <div className={styles.navigation}>
          {showControls && (
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.control}
                onClick={goToPrevious}
                disabled={!loop && isFirstSlide}
                aria-label="Previous slide"
              >
                Previous
              </button>

              <button
                type="button"
                className={styles.control}
                onClick={goToNext}
                disabled={!loop && isLastSlide}
                aria-label="Next slide"
              >
                Next
              </button>
            </div>
          )}

          {showIndicators && (
            <div
              className={styles.indicators}
              role="group"
              aria-label="Choose a slide"
            >
              {slides.map((slide, index) => {
                const isActive = currentIndex === index;
                const slideId = `${carouselId}-slide-${index}`;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    className={styles.indicator}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}${
                      slide.label ? `: ${slide.label}` : ''
                    }`}
                    aria-controls={slideId}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className={styles.indicatorDot} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          )}

          {autoPlay && (
            <div className={styles.rotationControls}>
              <button
                type="button"
                className={styles.control}
                onClick={() => setIsRotating((previous) => !previous)}
                aria-label={
                  isRotating
                    ? 'Stop automatic rotation'
                    : 'Start automatic rotation'
                }
              >
                {isRotating ? 'Pause' : 'Play'}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
