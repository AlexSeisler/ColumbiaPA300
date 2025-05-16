// src/hooks/useInViewTrigger.js
import { useEffect, useState, useRef } from 'react';

const useInViewTrigger = (threshold = 0.3) => {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, hasEntered];
};

export default useInViewTrigger;
