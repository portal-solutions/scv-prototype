import React from 'react';
import { useTranslation } from 'react-i18next';

const PersonalInformation = (props) => {
	const { t } = useTranslation();

	return (
		<div className="panel panel-default">
			<div className="panel-heading">{t('profile.profile-information.personal-information.title')}</div>
			<div className="panel-body text-center">
				<div className="row">
					<div className="col-xs-12 col-md-4">
						<label>{t('profile.profile-information.personal-information.first-name')}</label>
						<div>{props.firstName ? props.firstName : "-"}</div>
					</div>
					<div className="col-xs-12 col-md-4">
						<label>{t('profile.profile-information.personal-information.middle-name')}</label>
						<div>{props.middleName ? props.middleName : "-"}</div>
					</div>
					<div className="col-xs-12 col-md-4">
						<label>{t('profile.profile-information.personal-information.last-name')}</label>
						<div>{props.lastName ? props.lastName : "-"}</div>
					</div>
				</div>
			</div>
			<ul className="list-group">
				<li className="list-group-item">
					<div className="row">
						<div className="col-xs-12 col-md-4">
							<label>{t('profile.profile-information.personal-information.date-of-birth')}</label>
							<div>{props.dateOfBirth ? props.dateOfBirth.toLocaleDateString() : "-"}</div>
						</div>
						<div className="col-xs-12 col-md-4">
							<label>{t('profile.profile-information.personal-information.social-insurance-number')}</label>
							<div>{props.socialInsuranceNumber ? props.socialInsuranceNumber : "-"}</div>
						</div>
						<div className="col-xs-12 col-md-4">
							<label>{t('profile.profile-information.personal-information.language-of-preference')}</label>
							<div>{props.languageOfPreference ? props.languageOfPreference : "-"}</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default PersonalInformation;
