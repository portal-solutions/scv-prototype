import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { usePageMetadata } from '../../../context/PageMetadata';

/**
 * 404 Not Found component that is very similar to what's used by canada.ca
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Error404 = (props) => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: t('not-found.document-title'),
		pageIdentifier: t('not-found.page-identifier'),
		pageTitle: t('not-found.error-404')
	});

	return (
		<>
			<p className="small pagetag">{t('not-found.page-tag')}</p>
			<p>{t('not-found.apology')}</p>
			<ul>
				<li>
					<Trans i18nKey="not-found.return-home"><Link to="/" /></Trans>
				</li>
				<li>
					<Trans i18nKey="not-found.return-canada"><a href={t('not-found.return-canada-href')}>Return to Canada.ca</a></Trans>
				</li>
			</ul>
		</>
	);
}

export default Error404;
