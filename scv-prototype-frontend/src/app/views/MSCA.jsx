/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const MSCA = () => {
  const history = useHistory();
  const location = useLocation();
  const { auth, login } = useAuth();

  const handleLogin = () => {
    // call login
    (async () => {
      if (!auth.authenticated || auth.tokenExpired) {
        await login('user@example.com', 'password');
      }

      // redirect to scv
      const { from } = location.state || { from: { pathname: '/' } };
      history.push(from);
    })();
  };

  return (
    <div className="text-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/msca-bg.png)` }}>
      <img src={`${process.env.PUBLIC_URL}/msca.png`} alt="" useMap="#map" />
      <map name="map">
        <area shape="rect" coords="717,106,886,151" alt="" href="#" onClick={handleLogin} />
      </map>
    </div>
  );
};

export default MSCA;
