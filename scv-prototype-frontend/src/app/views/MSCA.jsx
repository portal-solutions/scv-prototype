/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap-modal';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';

const MSCA = () => {
  const history = useHistory();
  const location = useLocation();
  const modalSINRef = useRef();
  const { t } = useTranslation();
  const { auth, login } = useAuth();

  const [inputSIN, setInputSIN] = useState(false);
  const [sin, setSIN] = useState('');

  const handleLogin = () => {
    setInputSIN(true);
  };

  const handleModalEntered = () => {
    modalSINRef.current.focus();
  };

  const handleModalClose = () => {
    setInputSIN(false);
  };

  const handleInputSIN = () => {
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
    <>
      <div className="text-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/msca-bg.png)` }}>
        <img src={`${process.env.PUBLIC_URL}/msca.png`} alt="" useMap="#map" />
        <map name="map">
          <area shape="rect" coords="717,106,886,151" alt="" href="#" onClick={handleLogin} />
        </map>
      </div>
      <Modal show={inputSIN} onEntered={handleModalEntered} onHide={handleModalClose} aria-labelledby="ModalHeader">
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">{t('msca.modal.provide-person-identification.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup label={t('person.social-insurance-number.full')} labelFor="sin" required>
              <input
                ref={modalSINRef}
                id="sin"
                name="sin"
                type="text"
                className="form-control"
                placeholder={t('person.social-insurance-number.placeholder')}
                value={sin}
                onChange={(e) => setSIN(e.target.value)}
                size="11"
                maxLength="11"
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-default">{t('action.cancel')}</Modal.Dismiss>
          <Button onClick={handleInputSIN} disabled={sin.length < 9}>
            {t('action.submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MSCA;
