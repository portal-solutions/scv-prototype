import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import AuthButton from './AuthButton';
import BreadcrumbItem from './BreadcrumbItem';
import './Header.scss';
import NavMenu from './NavMenu';

/**
 * Standard WETv4 <header> element.
 *
 * @author Greg Baker <gregory.j.baker@hrsc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Header = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const isFrench = i18n.language.startsWith('fr');
    i18n.changeLanguage(isFrench ? 'en' : 'fr');
  };

  return (
    <>
      <nav>
        <ul id="wb-tphp">
          <li className="wb-slc">
            <a className="wb-sl" href="#wb-cont">
              {t('wet-boew.header.skip-links.main-content')}
            </a>
          </li>
          <li className="wb-slc">
            <a className="wb-sl" href="#wb-info">
              {t('wet-boew.header.skip-links.about-government')}
            </a>
          </li>
        </ul>
      </nav>
      <header>
        <div id="wb-bnr" className="container">
          <div className="mt-4" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <section>
              <h2 className="wb-inv">{t('action.sign-out')}</h2>
              <AuthButton />
            </section>
            <section>
              <h2 className="wb-inv">{t('wet-boew.header.language-selection')}</h2>
              <Button
                variant={Button.variants.link}
                size={Button.sizes.sm}
                lang={t('wet-boew.header.language-lang')}
                onClick={toggleLanguage}>
                <span>{t('wet-boew.header.language-toggle')}</span>
              </Button>
            </section>
          </div>
          <div className="row">
            <div className="brand col-xs-5 col-md-4" property="publisher" typeof="GovernmentOrganization">
              <a href={t('wet-boew.header.canada-href')} property="url">
                <img src={t('wet-boew.header.brand-img-href')} alt="" property="logo" />
                <span className="wb-inv" property="name">
                  {t('wet-boew.header.brand-text')}
                </span>
              </a>
              <meta property="areaServed" typeof="Country" content="Canada" />
              <link property="logo" href={t('wet-boew.header.brand-logo.href')} />
            </div>
          </div>
        </div>

        <NavMenu />

        <nav id="wb-bc" property="breadcrumb">
          <h2 className="wb-inv">{t('wet-boew.header.breadcrumbs.description')}</h2>
          <div className="container">
            <ol className="breadcrumb">
              <BreadcrumbItem
                href={t('wet-boew.header.breadcrumbs.home.href')}
                text={t('wet-boew.header.breadcrumbs.home.text')}
              />
            </ol>
          </div>
        </nav>

        {/* TODO :: GjB :: Dynamic messages */}
      </header>
    </>
  );
};

export default Header;
