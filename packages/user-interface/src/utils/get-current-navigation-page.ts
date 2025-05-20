import { UIMatch } from "react-router";
import { NavigationItem } from "../interfaces/navigation-item";

/**
 * Needed for multiple backwards compatibility reasons, because the old nl-portal design
 * shows the current page + icon below the header. In case of the childpages, the parent page + icon is shown.
 * Also the document title show this "navigation page" (first parent which is shown in the menu)
 *
 * @param matches react-router-dom useMatches
 * @param navigationItems navigationItems
 * @returns current navigation page
 */
export const getCurrentNavigationPage = (
  matches: UIMatch[],
  navigationItems: NavigationItem[][],
) => {
  return navigationItems
    .flat()
    .reverse()
    .find((item) => {
      return matches.find((match) => item?.path === match.pathname);
    });
};
