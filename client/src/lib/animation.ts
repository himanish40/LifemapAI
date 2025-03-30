/**
 * This module provides Apple-style scroll animations
 * Similar to how Apple's website reveals content as you scroll
 */

export function initScrollAnimations(): void {
  document.addEventListener('DOMContentLoaded', setupAnimations);
  
  // Run immediately if the page is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupAnimations();
  }
}

function setupAnimations(): void {
  // Get all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-fade-in, .animate-scale-up, .animate-slide-left, .animate-slide-right'
  );
  
  if (animatedElements.length === 0) return;
  
  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Add the 'animate' class when element is visible
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Unobserve after animation is triggered if it has 'animate-once' class
          if (entry.target.classList.contains('animate-once')) {
            observer.unobserve(entry.target);
          }
        } else if (!entry.target.classList.contains('animate-once')) {
          // Remove animation class when element is not visible (only if it's not 'animate-once')
          // This creates a re-animation effect when scrolling back up
          entry.target.classList.remove('animate');
        }
      });
    },
    {
      // Start animation when element is 15% visible
      threshold: 0.15,
      // Start animation slightly before element enters viewport
      rootMargin: '30px 0px',
    }
  );
  
  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Creates a staggered animation effect on child elements
 * @param parentSelector - CSS selector for the parent element
 * @param childSelector - CSS selector for the child elements to animate
 * @param baseDelay - Starting delay in milliseconds
 * @param increment - Delay increment between each child in milliseconds
 */
export function createStaggeredAnimation(
  parentSelector: string,
  childSelector: string,
  baseDelay: number = 0,
  increment: number = 100
): void {
  const containers = document.querySelectorAll(parentSelector);
  
  containers.forEach((container) => {
    const elements = container.querySelectorAll(childSelector);
    elements.forEach((element, index) => {
      const delay = baseDelay + (index * increment);
      (element as HTMLElement).style.transitionDelay = `${delay}ms`;
    });
  });
}