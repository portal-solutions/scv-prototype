import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

const Details = () => {

	const imageUrl = "https://via.placeholder.com/125";

	const fakeData = [
		{
			id: 1,
			title: "TD Canada Trust",
			identifier: "********6285",
			usedFor: ["Employment Insurance"],
			image: imageUrl
		},
		{
			id: 1,
			title: "Bank of Montreal",
			identifier: "********8563",
			usedFor: ["Canada Learning Bond"],
			image: imageUrl
		},
		{
			id: 3,
			title: "PayPal",
			identifier: "M********@email.com",
			usedFor: null,
			image: imageUrl
		},
		{
			id: 4,
			title: "Reloadable debit card",
			identifier: "********2345",
			usedFor: null,
			image: imageUrl
		},
	];

	const { t } = useTranslation();

	return (
		<>
			<div className="row">
				<div className="col-xs-12">
					<div className="panel panel-default">
						{fakeData && fakeData.length ?
							<ul className="list-group">
								{fakeData.map(item =>
									<li className="list-group-item" key={item.id}>
										<div className="media">
											<div className="media-left">
												<img className="media-object" src={item.image} alt={item.title} />
											</div>
											<div className="media-body">
												<h4 className="media-heading">{item.title}</h4>
												<p>{item.identifier}</p>
												<p>
													{
														item.usedFor ?
															<Trans i18nKey="profile.payment-details.details.used-for">
																{
																	item.usedFor.join(', ')
																}
															</Trans> :
															<Trans i18nKey="profile.payment-details.details.not-in-use" />
													}
												</p>
												<div>
													<button className="btn btn-link btn-sm">{t('action.edit')}</button>
													<small>|</small>
													<button className="btn btn-link btn-sm">{t('action.remove')}</button>
												</div>
											</div>
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
				</div>
			</div>
		</>
	);
};

export default Details;
