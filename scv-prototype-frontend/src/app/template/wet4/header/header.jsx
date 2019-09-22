import React from 'react';
import { useTranslation } from "react-i18next";
import './header.css';

/**
 * Standard WETv4 <header> element.
 *
 * @author Greg Baker <gregory.j.baker@hrsc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const Header = (props) => {
	const { i18n, t } = useTranslation();

	return (
		<>
			<nav>
				<ul id="wb-tphp">
					<li className="wb-slc">
						<a className="wb-sl" href="#wb-cont">{ t('wet-boew.header.skip-links.main-content') }</a>
					</li>
					<li className="wb-slc">
						<a className="wb-sl" href="#wb-info">{ t('wet-boew.header.skip-links.about-government') }</a>
					</li>
				</ul>
			</nav>
			<header>
				<div id="wb-bnr" className="container">
					<section id="wb-lng" className="text-right">
						<h2 className="wb-inv">{ t('wet-boew.header.language-selection') }</h2>
						<ul className="list-inline margin-bottom-none">
							<li>
								<button className="btn btn-link" lang={ t('wet-boew.header.language-lang') } onClick={ () => i18n.changeLanguage((i18n.language === 'en') ? 'fr' : 'en') }>
									<span>{ t('wet-boew.header.language-toggle') }</span>
								</button>
							</li>
						</ul>
					</section>
					<div className="row">
						<div className="brand col-xs-5 col-md-4" property="publisher" typeof="GovernmentOrganization">
							<a href={ t('wet-boew.header.canada-href') } property="url">
								<img src={ t('wet-boew.header.brand-img-href') } alt="" property="logo"/>
								<span className="wb-inv" property="name">{ t('wet-boew.header.brand-text') }</span>
							</a>
							<meta property="areaServed" typeof="Country" content="Canada"/>
							<link property="logo" href={ t("wet-boew.header.brand-logo.href") }/>
						</div>
					</div>
				</div>

				{ /* TODO :: GjB :: add in a GCWeb menu (via ajax?) */ }
				<nav className="gcweb-v2 gcweb-menu" typeof="SiteNavigationElement"></nav>

				<nav id="wb-bc" property="breadcrumb">
					<h2 className="wb-inv">{ t('wet-boew.header.breadcrumbs.description') }</h2>
					<div className="container">
						<ol className="breadcrumb">
							<BreadcrumbItem
								href={ t('wet-boew.header.breadcrumbs.home.href') }
								text={ t('wet-boew.header.breadcrumbs.home.text') }
							/>
						</ol>
					</div>
				</nav>

				{ /* TODO :: GjB :: Dynamic messages */ }
			</header>
		</>
	);
}

/**
 * Standard WETv4 breadcrumb item.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const BreadcrumbItem = (props) => {
	return (
		<li>
			{ props.href
				? (<a href={ props.href }>{ props.text }</a>)
				: (<span>{ props.text }</span>)
			}
		</li>
	);
}
