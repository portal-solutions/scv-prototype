import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';

const JobsSkills = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('jobs-skills.document-title'));
	usePageIdentifier(t('jobs-skills.page-identifier'));
	usePageTitle(t('jobs-skills.page-title'));

	return (
		<>
			<p><Trans i18nKey="jobs-skills.message" /></p>
		</>
	);
};

export default JobsSkills;
