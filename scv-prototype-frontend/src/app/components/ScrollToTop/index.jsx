import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/**
 * Scroll Restoration
 * ref.: https://reacttraining.com/react-router/web/guides/scroll-restoration
 *
 * @author Sebastien Comeau <sebastien.comeau@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
