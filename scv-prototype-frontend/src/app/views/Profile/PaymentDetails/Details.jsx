import React, { useState, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Loading from '../../../components/Loading';

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
			id: 2,
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

	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchHistory = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				// simulate fake fetch with sleep
				await (new Promise((resolve) => setTimeout(resolve, 1000)));

				//set data with fake data
				setData(fakeData);
			} catch (error) {
				console.error(error)
				setIsError(true);
			}

			setIsLoading(false);
		}

		fetchHistory();
	}, []);

	return (
		<>
			<div className="row">
				<div className="col-xs-12 text-center">
					{isLoading && <div className="text-center"><Loading /></div>}
					{isError && <h4 className="text-center">{t('something-went-wrong')}</h4>}
				</div>
			</div>

			{(!isLoading && !isError) &&
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
				</div>}
		</>
	);
};

export default Details;
