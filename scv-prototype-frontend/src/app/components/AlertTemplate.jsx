import React from 'react';
import { useTranslation } from 'react-i18next';

const alertStyle = {
  backgroundColor: '#151515',
  color: 'white',
  padding: '10px',
  textTransform: 'uppercase',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  width: '300px',
  boxSizing: 'border-box'
};

const buttonStyle = {
  marginLeft: '20px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#FFFFFF'
};

const AlertTemplate = ({ message, options, style, close }) => {
  const { t } = useTranslation();

  const icons = {
    info: {
      title: t('alert.info'),
      iconClassName: 'fas fa-info text-info'
    },
    success: {
      title: t('alert.success'),
      iconClassName: 'fas fa-success text-success'
    },
    error: {
      title: t('alert.error'),
      iconClassName: 'fas fa-error text-error'
    },
    close: {
      title: t('alert.close'),
      iconClassName: 'fas fa-times'
    }
  };

  // alert type icon to use
  let alertTypeIcon = null;

  if (options.type === 'info') {
    alertTypeIcon = icons.info;
  } else if (options.type === 'success') {
    alertTypeIcon = icons.success;
  } else if (options.type === 'error') {
    alertTypeIcon = icons.error;
  }

  return (
    <div style={{ ...alertStyle, ...style }}>
      {alertTypeIcon && (
        <span>
          <span className="sr-only">{alertTypeIcon.title}</span>
          <i className={alertTypeIcon.iconClassName}></i>
        </span>
      )}
      <span style={{ flex: 2 }}>{message}</span>
      <button onClick={close} style={buttonStyle}>
        <span className="sr-only">{icons.error.title}</span>
        <i className={icons.error.iconClassName}></i>
      </button>
    </div>
  );
};

export default AlertTemplate;
