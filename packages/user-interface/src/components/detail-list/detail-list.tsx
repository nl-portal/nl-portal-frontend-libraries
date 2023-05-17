import * as React from 'react';
import {FC, Fragment, ReactElement, useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from '@gemeente-denhaag/link';
import {EditIcon} from '@gemeente-denhaag/icons';
import Skeleton from 'react-loading-skeleton';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import {Link as RouterLink} from 'react-router-dom';
import styles from './detail-list.module.scss';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';
import {UserInformationContext} from '../../contexts';

interface DetailListProps {
  details: Array<{
    translationKey: string;
    loading?: boolean;
    value?: string | ReactElement | undefined | null | false;
    showEditButton?: boolean;
  }>;
}

const DetailList: FC<DetailListProps> = ({details}) => {
  const {hrefLang} = useContext(LocaleContext);
  const {setUserInformation} = useContext(UserInformationContext);
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const EMPTY_VALUE = '-';

  return (
    <Fragment>
      {details.map(detail => (
        <div className={styles['detail-list__item']} key={detail.translationKey}>
          <span className={styles['detail-list__header']}>
            <b>
              <FormattedMessage id={`account.detail.${detail.translationKey}`} />
            </b>
          </span>
          <div className={styles['detail-list__value-edit']}>
            <span className={styles['detail-list__value']}>
              {detail.loading ? (
                <Skeleton width={isDesktop ? 200 : 150} />
              ) : (
                detail.value || EMPTY_VALUE
              )}
            </span>
            {detail.showEditButton && (
              <Link
                onClick={() =>
                  setUserInformation(
                    detail.translationKey,
                    typeof detail.value === 'string' ? detail.value : ''
                  )
                }
                component={RouterLink}
                to={`/account/aanpassen?prop=${detail.translationKey}`}
                hrefLang={hrefLang}
                icon={<EditIcon />}
                iconAlign="start"
              >
                {isDesktop && <FormattedMessage id="account.edit" />}
              </Link>
            )}
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export {DetailList};
