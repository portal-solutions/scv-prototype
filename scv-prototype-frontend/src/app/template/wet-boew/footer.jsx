import React from 'react';
import { useTranslation } from 'react-i18next';
import './footer.css';

/**
 * Standard WETv4 footer.
 * (stateless)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
export const Footer = (props) => {
	const { t } = useTranslation();

	/*
	 * TODO :: GjB :: render passed-in props.brandLinks and props.navLinks
	 */

	return (
		<footer id="wb-info">
			<div className="landscape">
				<nav className="container wb-navcurr">
					<h2 className="wb-inv">{ t('wet-boew.footer.info.description') }/></h2>
					<ul className="list-unstyled colcount-sm-2 colcount-md-3">
						<li><a href={ t('wet-boew.footer.info.contact.href') }>{ t('wet-boew.footer.info.contact.text') }</a></li>
						<li><a href={ t('wet-boew.footer.info.departments.href') }>{ t('wet-boew.footer.info.departments.text') }</a></li>
						<li><a href={ t('wet-boew.footer.info.public-service.href') }>{ t('wet-boew.footer.info.public-service.text') }</a></li>
						<li><a href={ t('wet-boew.footer.info.news.href') }>{ t('wet-boew.footer.info.news.text') }</a></li>
						<li><a href={ t('wet-boew.footer.info.laws.href') }>{ t('wet-boew.footer.info.laws.text') }</a></li>
						<li><a href={ t('wet-boew.footer.info.reporting.href') }>{ t('wet-boew.footer.info.reporting.text') }</a></li>
						<li><a href={ t('wet-boew.footer.info.prime-minister.href') }>{ t('wet-boew.footer.info.prime-minister.text') }</a></li>
						<li><a href={ t('wet-boew.footer.info.system.href') }>{ t('wet-boew.footer.info.system.text') }</a></li>
						<li><a href={ t('wet-boew.footer.info.open-government.href') }>{ t('wet-boew.footer.info.open-government.text') }</a></li>
					</ul>
				</nav>
			</div>
			<div className="brand">
				<div className="container">
					<div className="row">
						<nav className="col-md-9 col-lg-10 ftr-urlt-lnk">
							<h2 className="wb-inv">{ t('wet-boew.footer.brand.description') }</h2>
							<ul>
								<li><a href={ t('wet-boew.footer.brand.social.href') }>{ t('wet-boew.footer.brand.social.text') }</a></li>
								<li><a href={ t('wet-boew.footer.brand.mobile.href') }>{ t('wet-boew.footer.brand.mobile.text') }</a></li>
								<li><a href={ t('wet-boew.footer.brand.new-site.href') }>{ t('wet-boew.footer.brand.new-site.text') }</a></li>
								<li><a href={ t('wet-boew.footer.brand.terms.href') }>{ t('wet-boew.footer.brand.terms.text') }</a></li>
								<li><a href={ t('wet-boew.footer.brand.privacy.href') }>{ t('wet-boew.footer.brand.privacy.text') }</a></li>
							</ul>
						</nav>
						<div className="col-xs-6 visible-sm visible-xs tofpg">
							<a href="#wb-cont">{ t('wet-boew.footer.top-of-page') } <span className="glyphicon glyphicon-chevron-up"></span></a>
						</div>
						<div className="col-xs-6 col-md-3 col-lg-2 text-right">
							<img src={ t('wet-boew.footer.wordmark.href') } alt={ t('wet-boew.footer.wordmark.description') }/>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
