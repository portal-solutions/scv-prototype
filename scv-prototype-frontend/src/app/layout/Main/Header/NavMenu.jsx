import React from 'react';
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
  const { t } = useTranslation();

  return (
    <nav className="gcweb-v2 gcweb-menu" typeof="SiteNavigationElement">
      <div className="container">
        <h2 className="wb-inv">Menu</h2>
        <button type="button" aria-haspopup="true" aria-expanded="false">
          <span className="wb-inv">Main </span>Menu <span className="expicon glyphicon glyphicon-chevron-down" />
        </button>
        <ul role="menu" aria-orientation="vertical">
          <li role="presentation">
            <Link role="menuitem" to="/private" exact>
              <i className="fas fa-fw fa-home" /> {t('wet-boew.header.navbar.home')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/profile" exact>
              <i className="fas fa-fw fa-user" /> {t('wet-boew.header.navbar.profile')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/notifications" exact>
              <i className="fas fa-fw fa-bell" /> {t('wet-boew.header.navbar.notifications')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/inbox" exact>
              <i className="fas fa-fw fa-inbox" /> {t('wet-boew.header.navbar.inbox')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/lets-connect" exact>
              <i className="fas fa-fw fa-comments" /> {t('wet-boew.header.navbar.lets-connect')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/book-appointment" exact>
              <i className="fas fa-fw fa-calendar" /> {t('wet-boew.header.navbar.book-appointment')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/benefits-services" exact>
              <i className="fas fa-fw fa-hand-holding-heart" /> {t('wet-boew.header.navbar.benefits-services')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/jobs-skills" exact>
              <i className="fas fa-fw fa-briefcase" /> {t('wet-boew.header.navbar.jobs-skills')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/private/preferences" exact>
              <i className="fas fa-fw fa-cog" /> {t('wet-boew.header.navbar.preferences')}
            </Link>
          </li>
          <li role="presentation">
            <Link role="menuitem" to="/msca" exact>
              <i className="fas fa-fw fa-project-diagram" /> Mock MSCA
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
