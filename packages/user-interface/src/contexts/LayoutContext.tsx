import React, { useState } from "react";

interface LayoutContextInterface {
  menuOpened: boolean;
  hideMenu: () => void;
  showMenu: () => void;
  messagesCount: number;
  setMessagesCount: (value: number) => void;
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

interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [menuOpened, setMenuState] = useState(false);
  const [messagesCount, setMessagesCount] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
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

export default LayoutContext;
