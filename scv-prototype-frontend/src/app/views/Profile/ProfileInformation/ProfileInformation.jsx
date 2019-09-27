import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../../context/PageMetadata';
import Address from './Address';
import Email from './Email';
import Note from './Note';
import PersonalInformation from './PersonalInformation';
import Phone from './Phone';
import VolunteerExperience from './VolunteerExperience';

const ProfileInformation = () => {
	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: `${t('profile.profile-information.document-title')} - ${t('profile.document-title')}`,
		pageIdentifier: t('profile.profile-information.page-identifier'),
		pageTitle: `${t('profile.page-title')} - ${t('profile.profile-information.page-title')}`
	});

	// fake data
	const data = {
		personalInformation: {
			firstName: "Jason",
			middleName: "S.",
			lastName: "Colston",
			dateOfBirth: new Date(1992, 10, 15),
			socialInsuranceNumber: "432 194 447",
			languageOfPreference: "English",
		},
		addresses: [
			{
				id: 1,
				address: `51 Deerfield Road.
				Oakville ON L6H 4A4
				Canada`,
				type: "Primary, Residential",
				usedFor: ["Canada Learning Bond"]
			},
			{
				id: 2,
				address: `405 Hampstead Lane
				Oakville ON L6H 3R4
				Canada`,
				type: "Residential",
				usedFor: ["Employment Insurance"]
			}
		],
		phones: [
			{
				id: 1,
				number: "905-488-888",
				type: "Primary, Mobile",
				usedFor: ["Canada Learning Bond"]
			},
			{
				id: 2,
				number: "905-566-4444",
				type: "Home",
				usedFor: ["Canada Learning Bond"]
			},
			{
				id: 3,
				number: "905-488-888",
				type: "Work",
				usedFor: ["CSLP", "Job Bank"]
			},
			{
				id: 4,
				number: "905-488-2323",
				type: "Secondary, Mobile",
				usedFor: null
			}
		],
		emails: [
			{
				id: 1,
				address: "useremail@outlook.com",
				isPrimary: true,
				usedFor: null
			},
			{
				id: 2,
				address: "useremail2@outlook.com",
				isPrimary: false,
				usedFor: ["CSLP", "Job Bank"]
			}
		],
		volunteerExperiences: [
			{
				id: 1,
				type: "Service type",
				description: "Description of the service.",
				hours: 25
			},
			{
				id: 2,
				type: "Service type",
				description: "Description of the service.",
				hours: 10
			},
			{
				id: 3,
				type: "Service type",
				description: "Description of the service.",
				hours: 52
			}
		],
		notes: [{
			id: 1,
			content: "I want to be called by my middle name during service interactions.",
			createdOn: new Date()
		},
		{
			id: 2,
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ultricies odio.",
			createdOn: new Date()
		},
		{
			id: 3,
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ultricies odio.",
			createdOn: new Date()
		},
		{
			id: 4,
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ultricies odio.",
			createdOn: new Date()
		}]
	};

	return (
		<>
			<div className="row">
				<div className="col-xs-12">
					<PersonalInformation
						firstName={data.personalInformation.firstName}
						middleName={data.personalInformation.middleName}
						lastName={data.personalInformation.lastName}
						dateOfBirth={data.personalInformation.dateOfBirth}
						socialInsuranceNumber={data.personalInformation.socialInsuranceNumber}
						languageOfPreference={data.personalInformation.languageOfPreference}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12 col-md-6">
					<Address addresses={data.addresses} />
				</div>
				<div className="col-xs-12 col-md-6">
					<Phone phones={data.phones} />
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<Email emails={data.emails} />
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<VolunteerExperience volunteerExperiences={data.volunteerExperiences} />
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<Note notes={data.notes} />
				</div>
			</div>
		</>
	);
};

export default ProfileInformation;
