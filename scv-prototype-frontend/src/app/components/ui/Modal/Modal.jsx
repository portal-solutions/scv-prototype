import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ title, closeText, submitText, onClose, onSubmit, show, children }) => {
  const modalRef = useRef();

  const modalOpenClass = 'modal-open';

  const createBackdrop = () => {
    let el = document.createElement('div');
    el.className = 'modal-backdrop fade';
    return el;
  };

  const showModal = () => {
    const body = document.body;
    const backdrop = createBackdrop();
    const { current: modal } = modalRef;

    body.classList.add(modalOpenClass);

    body.appendChild(backdrop);
    backdrop.classList.remove('out');
    backdrop.classList.add('in');

    if (modal) {
      modal.classList.remove('out');
      modal.classList.add('in');
      modal.style.display = 'block';
    }
  };

  const closeModal = () => {
    const body = document.body;
    const backdrop = document.getElementsByClassName('modal-backdrop')[0];
    const { current: modal } = modalRef;

    if (modal) {
      modal.classList.remove('in');
      modal.classList.add('out');
      modal.style.display = 'none';
    }

    if (backdrop) {
      backdrop.classList.remove('in');
      backdrop.classList.add('out');
      backdrop.remove();
    }

    body.classList.remove(modalOpenClass);
  };

  setTimeout(() => {
    show ? showModal() : closeModal();
  }, 50);

  return (
    <section
      ref={modalRef}
      className="modal fade overlay-def"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">
              {title}
            </h4>
          </div>
          <div className="modal-body">{children}</div>
          {onClose || onSubmit ? (
            <div className="modal-footer">
              {onClose && (
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={onClose}>
                  {closeText}
                </button>
              )}
              {onSubmit && (
                <button type="button" className="btn btn-primary" onClick={onSubmit}>
                  {submitText}
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  closeText: PropTypes.string,
  submitText: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.any.isRequired
};

Modal.defaultProps = {
  closeText: 'Close',
  submitText: 'Submit',
  onClose: null,
  onSubmit: null,
  show: false
};

export default Modal;
