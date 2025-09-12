import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use timeout to wait for layout paint
    setTimeout(() => {
      document.documentElement.scrollTop = 0; // for Safari, Firefox, IE
      document.body.scrollTop = 0;             // for Chrome, Edge
      window.scrollTo({ top: 0, behavior: 'auto' }); // fallback
    }, 10); // small delay ensures DOM/layout is ready
  }, [pathname]);

  return null;
};

export default ScrollToTop;
