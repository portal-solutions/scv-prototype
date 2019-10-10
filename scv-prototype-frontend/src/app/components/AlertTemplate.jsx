import React from 'react';
import { useTranslation } from 'react-i18next';

const alertStyle = {
  backgroundColor: '#151515',
  color: 'white',
  padding: '10px',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  width: '300px',
  boxSizing: 'border-box',
  fontSize: '0.85em',
  fontFamily: 'Arial'
};

const buttonStyle = {
  marginLeft: '10px',
  padding: '0',
  flexGrow: '1',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#FFFFFF',
  alignSelf: 'flex-start'
};

const messageStyle = {
  width: '100%'
};

const iconContainerStyle = {
  marginRight: '5px',
  fontSize: '2em'
};

const AlertTemplate = ({ message, options, style, close }) => {
  const { t } = useTranslation();

  const icons = {
    info: {
      title: t('alert.info'),
      iconClassName: 'fas fa-info-circle fa-fw text-info'
    },
    success: {
      title: t('alert.success'),
      iconClassName: 'fas fa-check-circle fa-fw text-success'
    },
    error: {
      title: t('alert.error'),
      iconClassName: 'fas fa-exclamation-circle fa-fw text-danger'
    },
    close: {
      title: t('alert.close'),
      iconClassName: 'fas fa-window-close'
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
        <span style={iconContainerStyle}>
          <span className="sr-only">{alertTypeIcon.title}</span>
          <i className={alertTypeIcon.iconClassName}></i>
        </span>
      )}
      <span style={messageStyle}>{message}</span>
      <button type="button" onClick={close} style={buttonStyle}>
        <span className="sr-only">{icons.close.title}</span>
        <i className={icons.close.iconClassName}></i>
      </button>
    </div>
  );
};

export default AlertTemplate;
