import * as React from 'react';
import {FC, useContext} from 'react';
import {DocumentIcon} from '@gemeente-denhaag/icons';
import {Paragraph} from '@gemeente-denhaag/components-react';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {useIntl} from 'react-intl';
import prettyBytes from 'pretty-bytes';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import {PortalDocument} from '../../interfaces';
import styles from './document.module.scss';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';
import {DocumentDownload} from '../document-download';

type DocumentProps = Partial<PortalDocument>;

const Document: FC<DocumentProps> = ({uuid, extension, name, size,documentapi}) => {
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const {hrefLang} = useContext(LocaleContext);
  const intl = useIntl();

  return (
    <div className={styles.document}>
      <div className={styles['document__icon-container']}>
        <DocumentIcon className={styles.document__icon} />
      </div>
      <div
        className={classNames(styles.document__content, {
          [styles['document__content--desktop']]: isDesktop,
        })}
      >
        <Paragraph className={styles['document__file-name']}>
          {name ? (
            `${name} (${extension}, ${prettyBytes(size || 0, {
              locale: hrefLang,
            })})`
          ) : (
            <span aria-busy aria-disabled aria-label={intl.formatMessage({id: 'element.loading'})}>
              <Skeleton width={250} />
            </span>
          )}
        </Paragraph>
        <DocumentDownload uuid={uuid} name={name} documentapi={documentapi}/>
      </div>
    </div>
  );
};

export {Document};
