import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../../../components/Button';

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
										<Trans i18nKey="profile.profile-information.address.used-for-all" />
										:
										<Trans i18nKey="profile.profile-information.address.used-for">
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

export default Address;