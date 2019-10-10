import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import Button from '../../../components/Button';
import Roller from '../../../components/Loading';
import { useApi } from '../../../utils/api/ApiProvider';

const Details = () => {
  const { fetchPaymentDetails } = useApi();

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setData(await fetchPaymentDetails());
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
            <div className="panel panel-default">{data && data.length ? <DetailsList data={data} /> : <NoData />}</div>
          </div>
        </div>
      )}
    </>
  );
};

const DetailsList = ({ data }) => {
  const { t } = useTranslation();

  return (
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
                  <Trans i18nKey="profile.payment-details.details.used-for">{item.usedFor.join(', ')}</Trans>
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
  );
};

DetailsList.propTypes = {
  // TODO :: GjB :: add a shape validation here...
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
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

const NoData = () => {
  const { t } = useTranslation();

  return (
    <div className="panel-body">
      <p className="text-center">
        <em>{t('no-data-available')}</em>
      </p>
    </div>
  );
};

export default Details;
