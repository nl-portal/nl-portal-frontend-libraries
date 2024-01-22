import { useState } from "react";
import LayoutContext from "../contexts/LayoutContext";
import { PortalPage } from "../interfaces/portal-page";

interface LayoutProviderProps {
  children: React.ReactNode;
  initialPage: PortalPage;
}

const LayoutProvider = ({ children, initialPage }: LayoutProviderProps) => {
  const [menuOpened, setMenuState] = useState(false);
  const [messagesCount, setMessagesCount] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [mobileMenuOpened, setMobileMenuState] = useState(false);
  const [fullscreenForm, setFullscreenForm] = useState(false);
  const [currentFormTitle, setCurrentFormTitle] = useState("");
  const hideMenu = () => setMenuState(false);
  const showMenu = () => setMenuState(true);
  const hideMobileMenu = () => setMobileMenuState(false);
  const showMobileMenu = () => setMobileMenuState(true);
  const enableFullscreenForm = () => setFullscreenForm(true);
  const disableFullscreenForm = () => setFullscreenForm(false);
  const clearCurrentFormTitle = () => setCurrentFormTitle("");

  return (
    <LayoutContext.Provider
      value={{
        menuOpened,
        hideMenu,
        showMenu,
        messagesCount,
        setMessagesCount,
        currentPage,
        setCurrentPage,
        mobileMenuOpened,
        hideMobileMenu,
        showMobileMenu,
        headerHeight,
        setHeaderHeight,
        fullscreenForm,
        enableFullscreenForm,
        disableFullscreenForm,
        currentFormTitle,
        setCurrentFormTitle,
        clearCurrentFormTitle,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
