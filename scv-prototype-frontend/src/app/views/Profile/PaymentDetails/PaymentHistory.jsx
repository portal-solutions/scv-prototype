import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../../../components/Loading';
import { useApi } from '../../../utils/api';

const PaymentHistory = () => {
  const { t } = useTranslation();
  const { fetchPaymentHistory, data, error, loading } = useApi();

  useEffect(() => {
    fetchPaymentHistory();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-xs-12 text-center">
          {loading && (
            <div className="text-center">
              <Loading />
            </div>
          )}
          {error && <h4 className="text-center">{t('something-went-wrong')}</h4>}
        </div>
      </div>

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

export default PaymentHistory;
