import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../../../components/Button';

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
										<Trans i18nKey="profile.profile-information.phone.used-for-all" />
										:
										<Trans i18nKey="profile.profile-information.phone.used-for">
											{
												data.usedFor.join(', ')
											}
										</Trans>
								}
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

export default Phone;