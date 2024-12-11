import { useMemo } from "react";
import { NavigationItem } from "../interfaces/navigation-item";

const useEnableMessagesCount = (menuItems: NavigationItem[][]) => {
  return useMemo(() => {
    return menuItems.flat().some((item) => item.hasMessagesCount === true);
  }, [menuItems]);
};

export default useEnableMessagesCount;
