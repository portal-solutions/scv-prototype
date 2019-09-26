import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

const Phone = (props) => {
	const { t } = useTranslation();

	return (
		<div className="panel panel-default">
			<div className="panel-heading">{t('profile.profile-information.phone.title')}</div>
			{props.phones && props.phones.length ?
				<ul className="list-group">
					{props.phones.map(data =>
						<li className="list-group-item" key={data.id}>
							<p>{data.number}</p>
							<p className="text-muted">{data.type}</p>
							<p>
								{
									data.usedFor === null ?
										<Trans i18nKey="profile.profile-information.email.used-for-all" />
										:
										<Trans i18nKey="profile.profile-information.email.used-for">
											{
												data.usedFor.join(', ')
											}
										</Trans>
								}
							</p>
							<div>
								<a href="#">{t('action.edit')}</a> &#124; <a href="#">{t('action.remove')}</a>
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

export default Phone;
