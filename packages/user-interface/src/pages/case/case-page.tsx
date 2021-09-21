import * as React from 'react';
import {useGetZaakQuery} from '@nl-portal/api';
import {useEffect} from 'react';
import {Heading2} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {ArchiveIcon, CalendarIcon, DocumentIcon, MegaphoneIcon} from '@gemeente-denhaag/icons';
import {useMediaQuery, useQuery} from '../../hooks';
import styles from './case-page.module.scss';
import {MetaIcon} from '../../components';
import {BREAKPOINTS} from '../../constants';

const CasePage = () => {
  const intl = useIntl();
  const query = useQuery();
  const {data, loading, refetch} = useGetZaakQuery({
    variables: {id: query.get('id')},
  });
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className={styles.case}>
      <header className={styles.case__header}>
        <Heading2>
          {loading ? (
            <Skeleton width={250} />
          ) : (
            <FormattedMessage id={`case.${data?.getZaak.zaaktype.identificatie}.title`} />
          )}
        </Heading2>
      </header>
      <div className={styles['case__meta-icons']}>
        <MetaIcon
          title={intl.formatMessage({id: 'case.caseNumber'})}
          subtitle={(!loading && data?.getZaak.identificatie) || ''}
          icon={<ArchiveIcon />}
          showRightBorder={isMobile || isDesktop}
        />
        <MetaIcon
          title={intl.formatMessage({id: 'case.creationDate'})}
          subtitle={(!loading && data?.getZaak.startdatum) || ''}
          icon={<CalendarIcon />}
          showRightBorder={isDesktop}
        />
        <MetaIcon
          title={intl.formatMessage({id: 'case.status'})}
          subtitle={
            (!loading && data?.getZaak.status?.statustype.omschrijving?.toLowerCase()) || ''
          }
          icon={<MegaphoneIcon />}
          showRightBorder={isMobile || isDesktop}
        />
        <MetaIcon
          title={intl.formatMessage({id: 'case.documents'})}
          subtitle={(!loading && '0') || ''}
          icon={<DocumentIcon />}
        />
      </div>
    </section>
  );
};
export {CasePage};
