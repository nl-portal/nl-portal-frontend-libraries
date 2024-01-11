import {ReactElement} from 'react';

export interface PortalPage {
  path: string;
  titleTranslationKey: string;
  pageComponent: ReactElement;
  isHome?: boolean;
  showInMenu?: boolean;
  showMessagesCount?: boolean;
  icon?: ReactElement;
  children?: Array<PortalPage>;
  showLinkToParent?: boolean;
}
