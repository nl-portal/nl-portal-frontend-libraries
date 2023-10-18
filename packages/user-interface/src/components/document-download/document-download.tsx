import * as React from 'react';
import {FC, useContext} from 'react';
import {DownloadIcon} from '@gemeente-denhaag/icons';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link} from '@gemeente-denhaag/components-react';
import Skeleton from 'react-loading-skeleton';
import {ApiContext} from '@nl-portal/nl-portal-api';
import {KeycloakContext} from '@nl-portal/nl-portal-authentication';

interface DocumentDownloadProps {
  uuid?: string;
  name?: string;
  documentapi?: string;
}

const DocumentDownload: FC<DocumentDownloadProps> = ({uuid, name,documentapi}) => {
  const {restUri} = useContext(ApiContext);
  const {keycloakToken} = useContext(KeycloakContext);
  const intl = useIntl();
  const downloadLink = `${restUri}/document/${uuid}/documentapi/${documentapi}/content`;

  const handleLink = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const result = await fetch(downloadLink, {
      headers: {Authorization: `Bearer ${keycloakToken}`},
    });

    const blob = await result.blob();
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = href;
    link.download = `${name}`;
    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    link.remove();
    window.URL.revokeObjectURL(link.href);
  };

  return uuid && name ? (
    React.cloneElement(
      <Link iconAlign="start" icon={<DownloadIcon />} href={downloadLink} id={uuid} >
        <FormattedMessage id="element.download" />
      </Link>,
      {onClick: handleLink}
    )
  ) : (
    <Link iconAlign="start" disabled icon={<DownloadIcon />} href="/">
      <span aria-busy aria-disabled aria-label={intl.formatMessage({id: 'element.loading'})}>
        <Skeleton width={65} />
      </span>
    </Link>
  );
};

export {DocumentDownload};
