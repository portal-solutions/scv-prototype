import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../../context/PageMetadata';
import { AuthenticationContext } from '../../../context/Authentication';
import apiService from '../../../services/ApiService';
import Loading from '../../../components/loading';
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

	const { authenticationContext } = useContext(AuthenticationContext);

	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [fetchData, setFetchData] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				//TODO: userId should come from auth context
				const userId = 1;

				const data = await apiService.fetchProfile(authenticationContext.authToken, userId);

				console.log(data)

				setData(data);
			} catch (error) {
				console.log(error)
				setIsError(true);
			}

			setIsLoading(false);
		}

		fetchProfile();
	}, [fetchData]);

	return (
		<>
			<div className="row">
				<div className="col-xs-12 text-center">
					{isLoading && <div className="text-center"><Loading /></div>}

					{!isLoading && (
						<div className="text-right">
							<button class="btn btn-link btn-sm text-lowercase" onClick={() => { setFetchData(!fetchData) }}>
								<i className="fas fa-sync"></i>&nbsp;&nbsp;{t("action.refresh")}
							</button>
						</div>
					)}

					{isError && <h4 className="text-center">{t('something-went-wrong')}</h4>}
				</div>
			</div>

			{
				data &&
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
			}
		</>
	);
};

export default ProfileInformation;
