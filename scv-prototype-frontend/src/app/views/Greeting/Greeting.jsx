import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../components/Loading';
import { usePageMetadata } from '../../context/PageMetadata';
import { useApi } from '../../hooks';

/**
 * Component used for testing protected routes.
 * TODO :: GjB :: remove this (eventually)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Greeting = (props) => {
	const {data, error, loading, fetchGreetings} = useApi();

	usePageMetadata({
		documentTitle: 'Greetings! \u2014 Single client view',
		pageIdentifier: 'SCV-XXXX',
		pageTitle: 'A greeting for you'
	});

	// eslint-disable-next-line
	useEffect(() => { (async () => fetchGreetings())() }, []);

	return (
		<>
			{loading && (<div className="text-center mrgn-tp-lg"><Loading /></div>)}
			{error && (<Error />)}
			{data && (<Messages data={data}/>)}
		</>
	);
};

const Error = (props) => {
	const {t} = useTranslation();

	return (
		<div className="alert alert-danger">
			<span>{t('something-went-wrong')}</span>
		</div>
	)
};

const Messages = (props) => {
	return (
		<div className="row">
			<div className="col-xs-12">
				{props.data.map(greeting => <p key={greeting.message}>{greeting.message}</p>)}
			</div>
		</div>
	);
}

export default Greeting;
