import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * Standard WETv4 <Nav> element.
 *
 * TODO :: GjB :: localize this file
 *
 * @author Greg Baker <gregory.j.baker@hrsc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const NavMenu = () => {
  const navRef = useRef();
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!navRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [setExpanded]);

  return (
    <nav className="gcweb-v2 gcweb-menu" typeof="SiteNavigationElement" ref={navRef}>
      <div className="container">
        <h2 className="wb-inv">Menu</h2>
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={expanded}
          onClick={() => {
            setExpanded(!expanded);
          }}>
          <span className="wb-inv">Main </span>Menu <span className="expicon glyphicon glyphicon-chevron-down" />
        </button>
        <ul role="menu" aria-orientation="vertical">
          <li role="presentation">
            <Link role="menuitem" to="/private">
              <i className="fas fa-fw fa-home" /> {t('wet-boew.header.navbar.home')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/profile">
              <i className="fas fa-fw fa-user" /> {t('wet-boew.header.navbar.profile')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/service-preferences">
              <i className="fas fa-fw fa-cog" /> {t('wet-boew.header.navbar.service-preferences')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/msca">
              <i className="fas fa-fw fa-project-diagram" /> Mock MSCA
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
