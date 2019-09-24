import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useDocumentTitle, usePageTitle, usePageIdentifier } from '../../../hooks';
import { Link } from 'react-router-dom';

/**
 * 404 Not Found component that is very similar to what's used by canada.ca
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Error404 = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('not-found.document-title'));
	usePageIdentifier(t('not-found.page-identifier'))
	usePageTitle(t('not-found.error-404'));

	return (
		<>
			<p className="small pagetag">{t('not-found.page-tag')}</p>
			<p>{t('not-found.apology')}</p>
			<ul>
				<li>
					<Trans i18nKey="not-found.return-home"><Link to="/" /></Trans>
				</li>
				<li>
					<Trans i18nKey="not-found.return-canada"><a href={t('not-found.return-canada-href')} /></Trans>
				</li>
			</ul>
		</>
	);
}

export default Error404;
