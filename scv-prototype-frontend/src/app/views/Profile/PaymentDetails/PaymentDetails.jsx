import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageMetadata } from '../../../context/PageMetadata';
import NavBarItem from '../NavBarItem';
import Details from './Details';
import MakePayment from './MakePayment';
import PaymentHistory from './PaymentHistory';

const PaymentDetails = ({ match }) => {

	const { t } = useTranslation();

	usePageMetadata({
		documentTitle: `${t('profile.payment-details.document-title')} - ${t('profile.document-title')}`,
		pageIdentifier: t('profile.payment-details.page-identifier'),
		pageTitle: `${t('profile.page-title')} - ${t('profile.payment-details.page-title')}`
	});

	return (
		<>
			<Switch>
				<Route exact path={match.path}>
					<Redirect to={`${match.path}/details`} />
				</Route>
				<Route exact path={`${match.path}/details`} component={Details} />
				<Route exact path={`${match.path}/make-payment`} component={MakePayment} />
				<Route exact path={`${match.path}/payment-history`} component={PaymentHistory} />
			</Switch>
		</>
	);
};

export default PaymentDetails;
