import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../../components/Button';

const Email = ({ emails }) => {
  const { t } = useTranslation();

  return (
    <div className="panel panel-default">
      <div className="panel-heading">{t('profile.email.title')}</div>
      {emails && emails.length ? (
        <ul className="list-group">
          {emails.map((data) => (
            <li className="list-group-item" key={data.id}>
              <p>{data.address}</p>
              <p className="text-muted">
                {data.isPrimary ? t('profile.email.primary-email-address') : t('profile.email.secondary-email-address')}
              </p>
              <p>
                {data.usedFor === null ? (
                  <Trans i18nKey="profile.email.used-for-all" />
                ) : (
                  <Trans i18nKey="profile.email.used-for">{data.usedFor.join(', ')}</Trans>
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
  );
};

export default Email;
