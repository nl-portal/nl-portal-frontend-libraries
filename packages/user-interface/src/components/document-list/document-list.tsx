import * as React from 'react';
import {FC, Fragment} from 'react';
import {Document as PortalDocument} from '@nl-portal/nl-portal-api';
import {Paragraph} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import styles from './document-list.module.scss';
import {Document} from '../document';

interface DocumentListProps {
  documents?: Array<PortalDocument>;
}

const DocumentList: FC<DocumentListProps> = ({documents}) => (
  <Fragment>
    {!documents && (
      <div className={styles.document}>
        <Document />
      </div>
    )}
    {documents && documents.length > 0 && (
      <Fragment>
        {documents.map(document => {
          console.log(document.documentapi)
          const documentName = document?.bestandsnaam || '';
          const splitName = documentName?.split('.');
          const documentExtension =
            splitName && Array.isArray(splitName) && splitName.length > 1
              ? splitName[splitName.length - 1]
              : '';

          return (
            <div
              className={styles.document}
              key={`${document.bestandsnaam}${document.bestandsomvang}`}
            >
              <Document
                extension={documentExtension}
                name={documentName}
                size={document.bestandsomvang || 0}
                uuid={document.uuid || ''}
                documentapi={document.documentapi}
              />
            </div>
          );
        })}
      </Fragment>
    )}
    {documents && documents.length === 0 && (
      <Paragraph className={styles['document__no-data-message']}>
        <FormattedMessage id="documents.noDocuments" />
      </Paragraph>
    )}
  </Fragment>
);

export {DocumentList};
