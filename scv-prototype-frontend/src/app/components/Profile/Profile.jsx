import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';

const Profile = (props) => {
	const { t } = useTranslation();

	useDocumentTitle(t('profile.document-title'));
	usePageIdentifier(t('profile.page-identifier'));
	usePageTitle(t('profile.page-title'));

	return (
		<>
			<p><Trans i18nKey="profile.message" /></p>
		</>
	);
}

export default Profile;
