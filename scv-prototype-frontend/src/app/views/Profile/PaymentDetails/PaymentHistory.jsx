/* eslint-disable react/jsx-one-expression-per-line */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import Roller from '../../../components/Loading';
import { useApi } from '../../../utils/api';

const PaymentHistory = () => {
  const { t } = useTranslation();
  const { fetchPaymentHistory } = useApi();

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setData(await fetchPaymentHistory());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {error && error.name === 'InvalidTokenError' && (
        <Redirect to={{ pathname: '/sign-in', state: { tokenExpired: true } }} />
      )}

      {error && (error.name !== 'InvalidTokenError' || <Error />)}

      {loading && (
        <div className="text-center mrgn-tp-lg">
          <Roller />
        </div>
      )}

      {!loading && !error && (
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
                {data && data.length > 0 ? (
                  data.map((item) => <PaymentItem key={item.id} item={item} />)
                ) : (
                  <tr>
                    <td className="text-center" colSpan="4">
                      {t('no-data-available')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

const Error = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="alert alert-danger">
        <span>{t('something-went-wrong')}</span>
      </div>
    </>
  );
};

const PaymentItem = ({ item }) => {
  return (
    <tr>
      <td>{new Date(item.date).toISOString().split('T')[0]}</td>
      <td>{item.programService}</td>
      <td className="text-right">${item.amount.toFixed(2)}</td>
      <td>{item.accountNumber}</td>
    </tr>
  );
};

PaymentItem.propTypes = {
  item: PropTypes.shape({
    accountNumber: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.string,
    programService: PropTypes.string
  }).isRequired
};

export default PaymentHistory;
