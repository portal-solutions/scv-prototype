import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { useApi } from '../../utils/api';
import { usePageMetadata } from '../../utils/page-metadata';

/**
 * Component used for testing protected routes.
 * TODO :: GjB :: remove this (eventually)
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 * @since 0.0.0
 */
const Greeting = () => {
  const { fetchGreetings } = useApi();

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  usePageMetadata({
    documentTitle: 'Greetings! \u2014 Single client view',
    pageIdentifier: 'SCV-XXXX',
    pageTitle: 'A greeting for you'
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setData(await fetchGreetings());
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
          <Loading />
        </div>
      )}

      {data && <Messages data={data} />}
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

const Messages = ({ data }) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        {data.map((greeting) => (
          <p key={greeting.message}>{greeting.message}</p>
        ))}
      </div>
    </div>
  );
};

Messages.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string
    })
  ).isRequired
};

export default Greeting;
