import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../context/PageMetadata';

const JobsSkills = (props) => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: t('jobs-skills.document-title'),
		pageIdentifier: t('jobs-skills.page-identifier'),
		pageTitle: t('jobs-skills.page-title')
	});

	return (
		<>
			<p><Trans i18nKey="jobs-skills.message" /></p>
		</>
	);
};

export default JobsSkills;
