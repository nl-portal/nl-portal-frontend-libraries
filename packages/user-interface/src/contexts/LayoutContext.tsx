import * as React from "react";
import { PortalPage } from "../interfaces/portal-page";

interface LayoutContextInterface {
  menuOpened: boolean;
  hideMenu: () => void;
  showMenu: () => void;
  messagesCount: number;
  setMessagesCount: (value: number) => void;
  currentPage: PortalPage;
  setCurrentPage: (value: PortalPage) => void;
  mobileMenuOpened: boolean;
  hideMobileMenu: () => void;
  showMobileMenu: () => void;
  headerHeight: number;
  setHeaderHeight: (value: number) => void;
  fullscreenForm: boolean;
  enableFullscreenForm: () => void;
  disableFullscreenForm: () => void;
  currentFormTitle: string;
  setCurrentFormTitle: (value: string) => void;
  clearCurrentFormTitle: () => void;
}

const LayoutContext = React.createContext<LayoutContextInterface>(
  {} as LayoutContextInterface,
);

export default LayoutContext;
