import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { PageMetadataContext } from '../../../context/PageMetadata';
import BreadcrumbItem from './BreadcrumbItem';
import './Header.css';
import LoginButton from './LoginButton';
import NavBar from './NavBar';

/**
 * Standard WETv4 <header> element.
 *
 * @author Greg Baker <gregory.j.baker@hrsc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Header = (props) => {
	const { i18n, t } = useTranslation();
	const { pageMetadata } = useContext(PageMetadataContext);

	return (
		<>
			<nav>
				<ul id="wb-tphp">
					<li className="wb-slc">
						<a className="wb-sl" href="#wb-cont">{t('wet-boew.header.skip-links.main-content')}</a>
					</li>
					<li className="wb-slc">
						<a className="wb-sl" href="#wb-info">{t('wet-boew.header.skip-links.about-government')}</a>
					</li>
				</ul>
			</nav>
			<header>
				<div id="wb-bnr" className="container">
					<div className="clearfix">
						{pageMetadata.suppressLoginButton || (
							<section id="wb-auth" className="text-right">
								{/* TODO :: GjB :: translate this */}
								<h2 className="wb-inv">Sign in</h2>
								<ul className="list-inline margin-bottom-none">
									<li><LoginButton /></li>
								</ul>
							</section>
						)}
						<section id="wb-lng" className="text-right">
							<h2 className="wb-inv">{t('wet-boew.header.language-selection')}</h2>
							<ul className="list-inline margin-bottom-none">
								<li>
									<button className="btn btn-link btn-sm" lang={t('wet-boew.header.language-lang')} onClick={() => i18n.changeLanguage((i18n.language === 'en') ? 'fr' : 'en')}>
										<span>{t('wet-boew.header.language-toggle')}</span>
									</button>
								</li>
							</ul>
						</section>
					</div>
					<div className="row">
						<div className="brand col-xs-5 col-md-4" property="publisher" typeof="GovernmentOrganization">
							<a href={t('wet-boew.header.canada-href')} property="url">
								<img src={t('wet-boew.header.brand-img-href')} alt="" property="logo" />
								<span className="wb-inv" property="name">{t('wet-boew.header.brand-text')}</span>
							</a>
							<meta property="areaServed" typeof="Country" content="Canada" />
							<link property="logo" href={t("wet-boew.header.brand-logo.href")} />
						</div>
					</div>
				</div>

				<NavBar />

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

				{ /* TODO :: GjB :: Dynamic messages */}
			</header>
		</>
	);
}

export default Header;
