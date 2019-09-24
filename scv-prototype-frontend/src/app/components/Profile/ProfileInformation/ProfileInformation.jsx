import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../../hooks';

const ProfileInformation = () => {
	const { t } = useTranslation();

	useDocumentTitle(`${t('profile.profile-information.document-title')} - ${t('profile.document-title')}`);
	usePageIdentifier(t('profile.profile-information.page-identifier'));
	usePageTitle(`${t('profile.page-title')} - ${t('profile.profile-information.page-title')}`);

	return (
		<>
			<div>ProfileInformation</div>
		</>
	);
};

export default ProfileInformation;
