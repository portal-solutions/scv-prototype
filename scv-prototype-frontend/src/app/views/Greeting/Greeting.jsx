import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useDocumentTitle, usePageIdentifier, usePageTitle } from '../../hooks';
import apiService from '../../services/ApiService';

/**
 * Component used for testing protected routes.
 * TODO :: GjB :: remove this (eventually)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Greeting = (props) => {
	const { authContext } = useContext(AuthContext);

	const [ greetings, setGreetings ] = useState();

	useDocumentTitle('Greetings! \u2014 Single client view');
	usePageIdentifier('SCV-XXXX');
	usePageTitle('A greeting for you');

	useEffect(() => {
		apiService.fetchGreetings(authContext.authToken)
			.then((greetings) => setGreetings(greetings));
	}, []);

	return (
		<>
			{greetings
				? greetings.map((greeting) => (<p>{greeting.message}</p>))
				: (<p className="text-center"><img src={process.env.PUBLIC_URL + '/spinner.gif'} width="80" height="80" /></p>)
			}
		</>
	);
};

export default Greeting;
