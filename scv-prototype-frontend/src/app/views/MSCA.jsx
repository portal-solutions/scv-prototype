/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap-modal';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import testSins from '../test-sins';
import { useAuth } from '../utils/auth';
import InvalidSINError from '../utils/errors/InvalidSINError';

const MSCA = () => {
  const history = useHistory();
  const location = useLocation();
  const modalSINRef = useRef();
  const { t } = useTranslation();
  const { login, logout } = useAuth();

  const [sin, setSIN] = useState(localStorage.getItem('msca-sin') || '');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidSINError, setInvalidSINError] = useState();
  const [error, setError] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (!showModal) {
      // clear modal states
      setLoading(false);
      setInvalidSINError(null);
      setError(null);

      // show modal
      setShowModal(true);
    }
  };

  const handleModalEntered = () => {
    modalSINRef.current.focus();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  /*
    Validate SIN with following formats:
    999999999
    999-999-999
    999 999 999
  */
  const isValidSIN = (val) => {
    return /^\d{9}$/.test(val) || /^\d{3}-\d{3}-\d{3}$/.test(val) || /^\d{3} \d{3} \d{3}$/.test(val);
  };

  const signIn = async () => {
    try {
      // save SIN in localstorage
      localStorage.setItem('msca-sin', sin);

      // call person login
      await login(sin);

      setLoggedIn(true);
    } catch (err) {
      // handle errors
      if (err instanceof InvalidSINError) {
        setInvalidSINError(err);
      } else {
        setError(err);
      }

      setLoading(false);
    }
  };

  const handleSubmitSIN = () => {
    setLoading(true);

    // check if sin if valid
    if (isValidSIN(sin)) {
      signIn();
    }
  };

  useEffect(() => {
    if (loggedIn) {
      // redirect to scv
      const { from } = location.state || { from: { pathname: '/' } };
      history.push(from);
    }
  }, [loggedIn]);

  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <div className="text-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/msca-bg.png)` }}>
        <img src={`${process.env.PUBLIC_URL}/msca.png`} alt="" useMap="#map" />
        <map name="map">
          <area shape="rect" coords="717,106,886,151" alt="" href="#" onClick={handleLogin} />
        </map>
      </div>
      <Modal
        backdrop="static"
        show={showModal}
        onEntered={handleModalEntered}
        onHide={handleModalClose}
        aria-labelledby="ModalHeader">
        <Modal.Header closeButton={!loading}>
          <Modal.Title id="ModalHeader">{t('msca.modal.provide-person-identification.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(invalidSINError || error) && (
            <div className="alert alert-danger">
              {invalidSINError && <span>{t('person.social-insurance-number.invalid')}</span>}
              {error && <span>{error.message}</span>}
            </div>
          )}

          <form>
            <FormGroup
              label={t('person.social-insurance-number.full')}
              labelFor="sin"
              className={invalidSINError && 'input-error'}
              required>
              <select
                id="sin"
                name="sin"
                className="form-control"
                value={sin}
                onChange={(e) => setSIN(e.target.value)}
                ref={modalSINRef}>
                {testSins.sort().map((testSin) => (
                  <option key={testSin}>{testSin}</option>
                ))}
              </select>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-link" disabled={loading}>
            {t('action.cancel')}
          </Modal.Dismiss>
          <Button onClick={handleSubmitSIN} disabled={loading || !isValidSIN(sin)}>
            <i className={`fas fa-sign-in-alt ${loading && 'fa-spinner fa-spin'}`} aria-hidden="true" />
            <span className="ml-2">{t('action.submit')}</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MSCA;
