import * as React from 'react';
import {FC, useContext, useEffect, useState} from 'react';
import {Paragraph} from '@gemeente-denhaag/components-react';
import {useIntl} from 'react-intl';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {
  useGetPersoonLazyQuery,
  useGetBedrijfLazyQuery,
  useGetGemachtigdeLazyQuery,
} from '@nl-portal/nl-portal-api';
import {KeycloakContext} from '@nl-portal/nl-portal-authentication';
import styles from './user-name.module.scss';
import {getNameString} from '../../utils';

interface UserNameProps {
  mobileMenu?: boolean;
}

const UserName: FC<UserNameProps> = ({mobileMenu}) => {
  const intl = useIntl();
  const [userName, setUserName] = useState('');
  const [volmachtgever, setVolmachtgever] = useState('');
  const [loadPersoon, {loading: persoonLoading, data: persoonData, error: persoonError}] =
    useGetPersoonLazyQuery();
  const [loadBedrijf, {loading: bedrijfLoading, data: bedrijfData, error: bedrijfError}] =
    useGetBedrijfLazyQuery();
  const [
    loadGemachtigde,
    {loading: gemachtigdeLoading, data: gemachtigdeData, error: gemachtigdeError},
  ] = useGetGemachtigdeLazyQuery();
  const {decodedToken} = useContext(KeycloakContext);
  const isLoading = persoonLoading || bedrijfLoading;

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.aanvrager?.bsn) {
        loadPersoon();
      } else if (decodedToken.aanvrager?.kvk) {
        loadBedrijf();
      }
      if (decodedToken.gemachtigde) {
        loadGemachtigde();
      }
    }
  }, [decodedToken]);

  useEffect(() => {
    const name = getNameString(persoonData?.getPersoon?.naam);
    if (decodedToken?.gemachtigde) {
      setVolmachtgever(name);
    } else {
      setUserName(name);
    }
  }, [persoonData]);

  useEffect(() => {
    const name = bedrijfData?.getBedrijf?.naam || '';
    if (decodedToken?.gemachtigde) {
      setVolmachtgever(name);
    } else {
      setUserName(name);
    }
  }, [bedrijfData]);

  useEffect(() => {
    if (gemachtigdeData?.getGemachtigde?.persoon) {
      setUserName(getNameString(gemachtigdeData?.getGemachtigde?.persoon) || '');
    } else {
      setUserName(gemachtigdeData?.getGemachtigde?.bedrijf?.naam || '');
    }
  }, [gemachtigdeData]);

  return (
    <div
      className={classNames(styles['user-name'], {[styles['user-name--mobile-menu']]: mobileMenu})}
    >
      <Paragraph className={styles['user-name__paragraph']}>
        {intl.formatMessage({id: 'header.welcome'}) +
          (userName ? ` ${userName}` : `${isLoading ? ' ' : ''}`)}
        {!persoonError && !bedrijfError && isLoading && !userName && <Skeleton width={80} />}
      </Paragraph>
      <Paragraph className={styles['user-name__paragraph']}>
        {volmachtgever ? `${intl.formatMessage({id: 'header.proxyFor'})} ${volmachtgever}` : ''}
        {!gemachtigdeError && gemachtigdeLoading && !volmachtgever && <Skeleton width={160} />}
      </Paragraph>
    </div>
  );
};
export {UserName};
