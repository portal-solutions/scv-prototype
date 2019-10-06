import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import { useApi } from '../../../utils/api';
import { usePageMetadata } from '../../../utils/page-metadata';
import Address from './Address';
import Email from './Email';
import Note from './Note';
import PersonalInformation from './PersonalInformation';
import Phone from './Phone';
import VolunteerExperience from './VolunteerExperience';

const ProfileInformation = () => {
	const { t } = useTranslation();
	const { fetchProfile, data, error, loading } = useApi();
	const [fetchData, setFetchData] = useState(false);

	usePageMetadata({
		documentTitle: `${t('profile.profile-information.document-title')} - ${t('profile.document-title')}`,
		pageIdentifier: t('profile.profile-information.page-identifier'),
		pageTitle: `${t('profile.page-title')} - ${t('profile.profile-information.page-title')}`
	});

	useEffect(() => {
		fetchProfile();
		// eslint-disable-next-line
	}, [fetchData]);

	return (
		<>
			<div className="row">
				<div className="col-xs-12 text-center">
					{loading ? (
						<div className="text-center">
							<Loading />
						</div>
					) : (
						<div className="text-right">
							<Button
								variant={Button.variants.link}
								size={Button.sizes.sm}
								className="text-lowercase"
								onClick={() => setFetchData(!fetchData)}
							>
								<i className="fas fa-sync mr-2"></i> {t('action.refresh')}
							</Button>
						</div>
					)}
					{error && <h4 className="text-center">{t('something-went-wrong')}</h4>}
				</div>
			</div>

			{data && (
				<>
					<div className="row">
						<div className="col-xs-12">
							<PersonalInformation
								firstName={data.firstName}
								middleName={data.middleName}
								lastName={data.lastName}
								dateOfBirth={data.dateOfBirth}
								socialInsuranceNumber={data.socialInsuranceNumber}
								languageOfPreference={data.languageOfPreference}
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
			)}
		</>
	);
};

export default ProfileInformation;
