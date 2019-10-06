import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import { usePageMetadata } from '../../../utils/page-metadata';
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
			<div className="row mb-4">
				<div className="col-xs-12">
					<ul className="nav nav-pills nav-justified">
						<NavBarItem text={t('profile.payment-details.navbar.details')} to={`${match.path}`} />
						<NavBarItem text={t('profile.payment-details.navbar.make-payment')} to={`${match.path}/make-payment`} />
						<NavBarItem
							text={t('profile.payment-details.navbar.payment-history')}
							to={`${match.path}/payment-history`}
						/>
					</ul>
				</div>
			</div>

			<Switch>
				<Route exact path={`${match.path}`} component={Details} />
				<Route exact path={`${match.path}/make-payment`} component={MakePayment} />
				<Route exact path={`${match.path}/payment-history`} component={PaymentHistory} />
			</Switch>
		</>
	);
};

export default PaymentDetails;
