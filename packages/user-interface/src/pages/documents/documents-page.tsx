import * as React from 'react';
import {useGetDocumentenQuery} from '@nl-portal/nl-portal-api';
import {FormattedMessage, useIntl} from 'react-intl';
import {Fragment, useEffect} from 'react';
import {Heading2, Paragraph} from '@gemeente-denhaag/components-react';
import {useQuery} from '../../hooks';
import {DocumentList} from '../../components/document-list';
import {LinkToParent} from '../../components/link-to-parent';
import styles from './documents-page.module.scss';

const DocumentsPage = () => {
  const query = useQuery();
  const intl = useIntl();
  const id = query.get('id');
  const {data, loading, error, refetch} = useGetDocumentenQuery({
    variables: {id},
  });
  const getCaseUrl = (caseId: string) => `/zaken/zaak?id=${caseId}`;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Fragment>
      {!error && (
        <LinkToParent
          text={
            !loading
              ? intl.formatMessage({id: `case.${data?.getZaak.zaaktype.identificatie}.title`})
              : ''
          }
          routePath={getCaseUrl(id || '')}
        />
      )}
      <section className={styles.documents}>
        <header className={styles.documents__header}>
          <Heading2>
            <FormattedMessage id="pageTitles.documents" />
          </Heading2>
        </header>
        {!error ? (
          <DocumentList documents={loading ? undefined : data?.getZaak.documenten} />
        ) : (
          <Paragraph>
            <FormattedMessage id="documents.fetchError" />
          </Paragraph>
        )}
      </section>
    </Fragment>
  );
};
export {DocumentsPage};
