import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthenticationContext } from '../../context/Authentication';
import { usePageMetadata } from '../../context/PageMetadata';
import apiService from '../../services/ApiService';
import Loading from '../../components/loading';

/**
 * Component used for testing protected routes.
 * TODO :: GjB :: remove this (eventually)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Greeting = (props) => {
	const { t } = useTranslation();
	const { authenticationContext } = useContext(AuthenticationContext);

	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [fetchData, setFetchData] = useState(null);

	usePageMetadata({
		documentTitle: 'Greetings! \u2014 Single client view',
		pageIdentifier: 'SCV-XXXX',
		pageTitle: 'A greeting for you'
	});

	useEffect(() => {
		const fetchGreetings = async () => {

			setIsError(false);
			setIsLoading(true);

			try {
				const data = await apiService.fetchGreetings(authenticationContext.authToken);

				console.log(data)

				setData(data);

			} catch (error) {
				console.log(error)
				setIsError(true);
			}

			setIsLoading(false);
		}

		fetchGreetings();

	}, [fetchData]);

	return (
		<>
			<div className="row">
				<div className="col-xs-12 text-center">
					{isLoading && <div className="text-center"><Loading /></div>}

					{!isLoading && (
						<div className="text-right">
							<button class="btn btn-link btn-sm text-lowercase" onClick={() => { setFetchData(!fetchData) }}>
								<i className="fas fa-sync"></i>&nbsp;&nbsp;{t("action.refresh")}
							</button>
						</div>
					)}

					{isError && <h4 className="text-center">{t('something-went-wrong')}</h4>}
				</div>
			</div>

			{data !== null && (
				<div className="row">
					<div className="col-xs-12">
						{data.map(greeting => <p key={greeting.message}>{greeting.message}</p>)}
					</div>
				</div>
			)}
		</>
	);
};

export default Greeting;
