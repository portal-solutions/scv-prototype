import React from 'react';
import { useTranslation } from 'react-i18next';

const VolunteerExperience = (props) => {
	const { t } = useTranslation();

	return (
		<div className="panel panel-default">
			<div className="panel-heading">{t('profile.profile-information.volunteer-experience.title')}</div>
			{props.volunteerExperiences && props.volunteerExperiences.length ?
				<ul className="list-group">
					{props.volunteerExperiences.map(data =>
						<li className="list-group-item" key={data.id}>
							<p><strong>{data.type ? data.type : "-"}</strong><br />
								<span className="text-muted">{data.description ? data.description : "-"}</span><br />
								<i className="fa fa-clock"></i> {data.hours ? data.hours : "-"} {t('profile.profile-information.volunteer-experience.service-hours')}
							</p>
							<div>
								<button className="btn btn-link btn-sm">{t('action.edit')}</button> | <button className="btn btn-link btn-sm">{t('action.remove')}</button>
							</div>
						</li>
					)}
				</ul>
				:
				<div className="panel-body">
					<p className="text-center"><em>{t('no-data-available')}</em></p>
				</div>
			}
		</div>
	);
};

export default VolunteerExperience;
