import * as React from 'react';
import {Button, Heading2} from '@gemeente-denhaag/components-react';
import {TextField} from '@gemeente-denhaag/textfield';
import {FormattedMessage, useIntl} from 'react-intl';
import {useContext, useEffect, useState} from 'react';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import {useHistory} from 'react-router-dom';
import {useUpdateBurgerProfielMutation} from '@nl-portal/nl-portal-api';
import {useQuery} from '../../hooks';
import styles from './edit-account-page.module.scss';
import {UserInformationContext} from '../../contexts';
import {REGEX_PATTERNS} from '../../constants';

const EditAccountPage = () => {
  const {currentLocale} = useContext(LocaleContext);
  const {userInformation} = useContext(UserInformationContext);
  const query = useQuery();
  const intl = useIntl();
  const history = useHistory();
  const [mutateFunction, {loading, error}] = useUpdateBurgerProfielMutation();

  const prop = query.get('prop');
  const propTranslation = intl.formatMessage({id: `account.detail.${prop}`});
  const errorTranslation = intl.formatMessage({id: `account.detail.${prop}.error`});

  const defaultValue = userInformation[`${prop}`];
  const regex = REGEX_PATTERNS[`${prop}`];

  const [valid, setValidity] = useState(true);
  const [value, setValue] = useState(defaultValue || '');
  const [mutating, setMutationStatus] = useState(false);

  const navigateToAccountPage = (): void => {
    history.push(`/account/`);
  };

  const onSave = (): void => {
    setMutationStatus(true);
    mutateFunction({variables: {klant: {[`${prop}`]: `${value}`}}});
  };

  useEffect(() => {
    if (regex) {
      setValidity(regex.test(value));
    }
  }, [value]);

  useEffect(() => {
    if (mutating && !loading) {
      if (!error) {
        navigateToAccountPage();
      }
      setMutationStatus(false);
    }
  }, [loading]);

  return (
    <section className={styles['edit-account']}>
      <header className={styles['edit-account__header']}>
        <Heading2>
          {currentLocale.toLowerCase().includes('nl')
            ? `${propTranslation} ${intl.formatMessage({id: 'account.edit'}).toLowerCase()}`
            : `${intl.formatMessage({id: 'account.edit'})} ${propTranslation.toLowerCase()}`}
        </Heading2>
      </header>
      <div className={styles['edit-account__text-field-container']}>
        <TextField
          onChange={e => setValue(e.target.value)}
          label={propTranslation}
          className={styles['edit-account__text-field']}
          defaultValue={defaultValue || ''}
          error={!valid && `${value}`.length >= 1}
          helperText={!valid && `${value}`.length >= 1 ? errorTranslation : ''}
          disabled={loading}
        />
      </div>
      <div className={styles['edit-account__buttons']}>
        <Button
          className={styles['edit-account__button']}
          onClick={onSave}
          disabled={!valid || loading || `${value}`.length === 0}
        >
          <FormattedMessage id="account.save" />
        </Button>
        <Button
          variant="secondary-action"
          className={styles['edit-account__button']}
          onClick={navigateToAccountPage}
          disabled={loading}
        >
          <FormattedMessage id="account.cancel" />
        </Button>
      </div>
    </section>
  );
};

export {EditAccountPage};
