/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import { useHistory } from 'react-router-dom';

const MSCA = () => {
  const history = useHistory();

  return (
    <div className="text-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/msca-bg.png)` }}>
      <img src={`${process.env.PUBLIC_URL}/msca.png`} alt="" useMap="#map" />
      <map name="map">
        <area shape="rect" coords="717,106,886,151" alt="" href="#" onClick={() => history.push('/')} />
      </map>
    </div>
  );
};

export default MSCA;
