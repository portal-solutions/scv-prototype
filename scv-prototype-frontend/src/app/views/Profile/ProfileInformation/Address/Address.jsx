import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

const Address = (props) => {
	const { t } = useTranslation();

	return (
		<div className="panel panel-default">
			<div className="panel-heading">{t('profile.profile-information.address.title')}</div>
			{props.addresses && props.addresses.length ?
				<ul className="list-group">
					{props.addresses.map(data =>
						<li className="list-group-item" key={data.id}>
							<p>{data.address.split('\n').map((s, index) =>
								<React.Fragment key={index}>{s}<br /></React.Fragment>
							)}
							</p>
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
								<button className="btn btn-link btn-sm">{t('action.edit')}</button>
								<small>|</small>
								<button className="btn btn-link btn-sm">{t('action.remove')}</button>
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

export default Address;
