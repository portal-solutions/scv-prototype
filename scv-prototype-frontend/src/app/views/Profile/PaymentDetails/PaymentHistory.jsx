import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../../../components/Loading';

const PaymentHistory = () => {
	
	const fakeData = [
		{
			id: 1,
			date: "2019-10-01T15:23:29.016Z",
			programService: "Passport",
			amount: 160.00,
			accountNumber: "********6285"
		},
		{
			id: 2,
			date: "2019-10-01T13:23:29.016Z",
			programService: "Passport",
			amount: 163.04,
			accountNumber: "********6285"
		},
		{
			id: 3,
			date: "2019-09-30T15:23:29.016Z",
			programService: "Program",
			amount: 162.25,
			accountNumber: "********6285"
		},
		{
			id: 4,
			date: "2019-09-30T09:23:29.016Z",
			programService: "Program",
			amount: 1600.00,
			accountNumber: "********6285"
		},
		{
			id: 5,
			date: "2019-09-29T15:23:29.016Z",
			programService: "Program",
			amount: 1235.00,
			accountNumber: "********6285"
		}
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
						<table className="table table-striped">
							<thead>
								<tr>
									<th>{t('profile.payment-details.payment-history.date')}</th>
									<th>{t('profile.payment-details.payment-history.program-service')}</th>
									<th className="text-right">{t('profile.payment-details.payment-history.amount')}</th>
									<th>{t('profile.payment-details.payment-history.account-number')}</th>
								</tr>
							</thead>
							<tbody>
								{data !== null && data.length > 0 ?
									data.map(item =>
										<tr key={item.id}>
											<td>{new Date(item.date).toISOString().split('T')[0]}</td>
											<td>{item.programService}</td>
											<td className="text-right">${item.amount.toFixed(2)}</td>
											<td>{item.accountNumber}</td>
										</tr>
									)
									: <tr><td className="text-center" colSpan="4">{t('no-data-available')}</td></tr>
								}
							</tbody>
						</table>
					</div>
				</div>
			}
		</>
	);
};

export default PaymentHistory;
