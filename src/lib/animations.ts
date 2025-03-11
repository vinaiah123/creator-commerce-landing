
import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

// Hook for detecting when an element is in viewport
export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;
        if (isElementVisible || !freezeOnceVisible) {
          setIsVisible(isElementVisible);
        }
        if (isElementVisible && freezeOnceVisible && observer && element) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, freezeOnceVisible]);

  return { elementRef, isVisible };
};

// Animation classes based on intersection observer
export const fadeInAnimation = (isVisible: boolean, delay: number = 0): string => {
  return `${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700 ease-out delay-${delay}`;
};

export const fadeInLeftAnimation = (isVisible: boolean, delay: number = 0): string => {
  return `${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} transition-all duration-700 ease-out delay-${delay}`;
};

export const fadeInRightAnimation = (isVisible: boolean, delay: number = 0): string => {
  return `${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-700 ease-out delay-${delay}`;
};

export const scaleAnimation = (isVisible: boolean, delay: number = 0): string => {
  return `${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-700 ease-out delay-${delay}`;
};
