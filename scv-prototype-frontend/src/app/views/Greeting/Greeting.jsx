import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../../context/Authentication';
import { usePageMetadata } from '../../context/PageMetadata';
import apiService from '../../services/ApiService';

/**
 * Component used for testing protected routes.
 * TODO :: GjB :: remove this (eventually)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Greeting = (props) => {
	const { authenticationContext } = useContext(AuthenticationContext);

	const [ greetings, setGreetings ] = useState();

	usePageMetadata({
		documentTitle: 'Greetings! \u2014 Single client view',
		pageIdentifier: 'SCV-XXXX',
		pageTitle: 'A greeting for you'
	});

	useEffect(() => {
		const fetchGreetings = async () => {
			setGreetings(await apiService.fetchGreetings(authenticationContext.authToken));
		}

		try {
			fetchGreetings();
		}
		catch (error) {
			// TODO :: GjB :: do something
		}
	}, [authenticationContext.authToken]);

	return (
		<>
			{greetings
				? greetings.map((greeting) => (<p id={greeting.message}>{greeting.message}</p>))
				: (<p className="text-center"><img src={process.env.PUBLIC_URL + '/spinner.gif'} alt="a loading spinner" width="80" height="80" /></p>)
			}
		</>
	);
};

export default Greeting;
