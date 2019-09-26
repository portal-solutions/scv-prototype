import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../../hooks';
import PersonalInformation from './PersonalInformation';
import Address from './Address';
import Phone from './Phone';
import Email from './Email';
import VolunteerExperience from './VolunteerExperience';
import Note from './Note';

const ProfileInformation = () => {
	const { t } = useTranslation();

	useDocumentTitle(`${t('profile.profile-information.document-title')} - ${t('profile.document-title')}`);
	usePageIdentifier(t('profile.profile-information.page-identifier'));
	usePageTitle(`${t('profile.page-title')} - ${t('profile.profile-information.page-title')}`);

	return (
		<>
			<div className="row">
				<div className="col-xs-12">
					<PersonalInformation />
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12 col-md-6">
					<Address />
				</div>
				<div className="col-xs-12 col-md-6">
					<Phone />
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<Email />
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<VolunteerExperience />
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<Note />
				</div>
			</div>
		</>
	);
};

export default ProfileInformation;
