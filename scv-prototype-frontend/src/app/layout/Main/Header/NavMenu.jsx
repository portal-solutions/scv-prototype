/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../utils/auth';

/**
 * Standard WETv4 <Nav> element.
 *
 * TODO :: GjB :: localize this file
 *
 * @author Greg Baker <gregory.j.baker@hrsc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const NavMenu = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { auth } = useAuth();
  const buttonRef = useRef();
  const menuRef = useRef();

  const [expanded, setExpanded] = useState(false);

  const handleNavMenuMouseDown = (e) => {
    const { current: button } = buttonRef;
    const { current: menu } = menuRef;

    if (button && menu) {
      const { target } = e;

      if (target === button || button.contains(target)) {
        // trigger button then toggle menu
        setExpanded((prevExpanded) => !prevExpanded);
      } else {
        // not trigger button then close menu
        setExpanded(false);

        // check if target exists in the menu's items
        if (menu.contains(target)) {
          // get the link element
          const link = target.nodeName === 'A' ? target : target.getElementsByTagName('A')[0];

          if (link && link.pathname) {
            // redirect to pathname
            history.push(link.pathname);
          }
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleNavMenuMouseDown);
    return () => document.removeEventListener('mousedown', handleNavMenuMouseDown);
  }, []);

  return auth.authenticated && !auth.tokenExpired && auth.agreedTermsAndConditions ? (
    <nav className="gcweb-v2 gcweb-menu" typeof="SiteNavigationElement">
      <div className="container">
        <h2 className="wb-inv">Menu</h2>
        <button ref={buttonRef} type="button" aria-haspopup="true" aria-expanded={expanded}>
          <span className="wb-inv">Main </span>Menu <span className="expicon glyphicon glyphicon-chevron-down" />
        </button>
        <ul ref={menuRef} role="menu" aria-orientation="vertical">
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
            <Link role="menuitem" to="/private/consent">
              <i className="fas fa-fw fa-lock" /> {t('wet-boew.header.navbar.consent')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/service-actions">
              <i className="fas fa-fw fa-user-friends" /> {t('wet-boew.header.navbar.service-actions')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  ) : null;
};

export default NavMenu;
