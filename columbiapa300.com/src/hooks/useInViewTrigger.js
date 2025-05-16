import { useEffect, useState, useRef } from 'react';

const useInViewTrigger = (threshold = 0.3) => {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // ✅ Ensure window exists (avoids SSR crash)
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, hasEntered];
};

export default useInViewTrigger;
