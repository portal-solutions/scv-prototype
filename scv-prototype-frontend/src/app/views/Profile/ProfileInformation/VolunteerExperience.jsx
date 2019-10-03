import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';

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
								<Button variant={Button.variants.link} size={Button.sizes.sm}>{t('action.edit')}</Button>
								<small>|</small>
								<Button variant={Button.variants.link} size={Button.sizes.sm}>{t('action.remove')}</Button>
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
