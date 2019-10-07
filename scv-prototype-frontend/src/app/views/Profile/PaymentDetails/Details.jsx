import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import { useApi } from '../../../utils/api';

const Details = () => {
  const { t } = useTranslation();
  const { fetchPaymentDetails, data, error, loading } = useApi();

  useEffect(() => {
    fetchPaymentDetails();
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
            <div className="panel panel-default">
              {data && data.length ? (
                <ul className="list-group">
                  {data.map((item) => (
                    <li className="list-group-item" key={item.id}>
                      <div className="media">
                        <div className="media-left">
                          <img className="media-object" src={item.image} alt={item.title} />
                        </div>
                        <div className="media-body">
                          <h4 className="media-heading">{item.title}</h4>
                          <p>{item.identifier}</p>
                          <p>
                            {item.usedFor ? (
                              <Trans i18nKey="profile.payment-details.details.used-for">
                                {item.usedFor.join(', ')}
                              </Trans>
                            ) : (
                              <Trans i18nKey="profile.payment-details.details.not-in-use" />
                            )}
                          </p>
                          <div>
                            <Button variant={Button.variants.link} size={Button.sizes.sm}>
                              {t('action.edit')}
                            </Button>
                            <small>|</small>
                            <Button variant={Button.variants.link} size={Button.sizes.sm}>
                              {t('action.remove')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="panel-body">
                  <p className="text-center">
                    <em>{t('no-data-available')}</em>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
